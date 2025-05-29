import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, setDeliveryMethod, setPaymentMethod, setAddress, clearCart } from '../../cartSlice';
import './styles.css';

const OrderForm = ({ onClose, products }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const [currentStep, setCurrentStep] = useState(1);

  const handleQuantityChange = (id, value) => {
    const numericValue = parseInt(value, 10) || 0;
    const product = products.find(p => p.id === id);
    
    if (product && numericValue > 0 && numericValue <= product.quantity) {
      dispatch(updateQuantity({ id, quantity: numericValue }));
    }
  };

  const calculateTotal = () => {
    return cart.items.reduce((total, item) => {
      const product = products.find(p => p.id === item.id);
      const price = product ? (product.price * (1 - (product.discount / 100))) : 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const calculateDeliveryCost = () => {
    const totalWeight = cart.items.reduce((sum, item) => {
      const product = products.find(p => p.id === item.id);
      return sum + (product ? product.weight * item.quantity : 0);
    }, 0);

    switch (cart.deliveryMethod) {
      case 'courier':
        return calculateTotal() < 200 ? 10 : 0;
      case 'post':
        return Math.ceil(totalWeight) * 5;
      case 'pickup':
        return 0;
      default:
        return 0;
    }
  };

  const handleSubmit = () => {
    alert('Заказ успешно оформлен!');
    dispatch(clearCart());
    onClose();
  };

  return (
    <div className="order-form-overlay">
      <div className="order-form">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Оформление заказа</h2>
        
        {currentStep === 1 && (
          <div className="order-step">
            <h3>Корзина</h3>
            <div className="cart-items">
              {cart.items.map(item => {
                const product = products.find(p => p.id === item.id);
                if (!product) return null;
                
                return (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <h4>{product.name}</h4>
                      <div className="cart-item-details">
                        <span>Цена: {Math.round(product.price * (1 - product.discount / 100))} руб</span>
                        <span>Вес: {product.weight} кг</span>
                        <span>На складе: {product.quantity} шт.</span>
                      </div>
                    </div>
                    <div className="cart-item-controls">
                      <input
                        type="number"
                        min="1"
                        max={product.quantity}
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      />
                      <button 
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="remove-button"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="cart-total">
              <strong>Итого: {calculateTotal().toFixed(2)} руб</strong>
            </div>
            <div className="form-navigation">
              <button 
                onClick={() => setCurrentStep(2)}
                disabled={cart.items.length === 0}
              >
                Далее
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="order-step">
            <h3>Доставка и оплата</h3>
            
            <div className="delivery-methods">
              <h4>Способ доставки:</h4>
              <label>
                <input
                  type="radio"
                  name="delivery"
                  value="courier"
                  checked={cart.deliveryMethod === 'courier'}
                  onChange={() => dispatch(setDeliveryMethod('courier'))}
                />
                Курьером ({calculateTotal() < 200 ? '10 руб' : 'бесплатно'})
              </label>
              
              <label>
                <input
                  type="radio"
                  name="delivery"
                  value="post"
                  checked={cart.deliveryMethod === 'post'}
                  onChange={() => dispatch(setDeliveryMethod('post'))}
                />
                Почтой ({Math.ceil(cart.items.reduce((sum, item) => {
                  const product = products.find(p => p.id === item.id);
                  return sum + (product ? product.weight * item.quantity : 0);
                }, 0)) * 5} руб)
              </label>
              
              <label>
                <input
                  type="radio"
                  name="delivery"
                  value="pickup"
                  checked={cart.deliveryMethod === 'pickup'}
                  onChange={() => dispatch(setDeliveryMethod('pickup'))}
                />
                Самовывоз (бесплатно)
              </label>
            </div>

            {cart.deliveryMethod !== 'pickup' && (
              <div className="address-field">
                <label>Адрес доставки:</label>
                <input
                  type="text"
                  value={cart.address}
                  onChange={(e) => dispatch(setAddress(e.target.value))}
                  placeholder="Введите адрес доставки"
                />
              </div>
            )}

            <div className="payment-methods">
              <h4>Способ оплаты:</h4>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={cart.paymentMethod === 'cash'}
                  onChange={() => dispatch(setPaymentMethod('cash'))}
                />
                Наличными
              </label>
              
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={cart.paymentMethod === 'card'}
                  onChange={() => dispatch(setPaymentMethod('card'))}
                />
                Банковской картой
              </label>
              
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="transfer"
                  checked={cart.paymentMethod === 'transfer'}
                  onChange={() => dispatch(setPaymentMethod('transfer'))}
                />
                Банковским переводом
              </label>
            </div>

            <div className="order-summary">
              <h4>Итоговая сумма:</h4>
              <div className="summary-row">
                <span>Товары:</span>
                <span>{calculateTotal().toFixed(2)} руб</span>
              </div>
              <div className="summary-row">
                <span>Доставка:</span>
                <span>{calculateDeliveryCost().toFixed(2)} руб</span>
              </div>
              <div className="summary-row total">
                <span>Всего:</span>
                <span>{(calculateTotal() + calculateDeliveryCost()).toFixed(2)} руб</span>
              </div>
            </div>

            <div className="form-navigation">
              <button onClick={() => setCurrentStep(1)}>Назад</button>
              <button 
                onClick={handleSubmit}
                disabled={cart.deliveryMethod !== 'pickup' && !cart.address}
              >
                Подтвердить заказ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderForm;