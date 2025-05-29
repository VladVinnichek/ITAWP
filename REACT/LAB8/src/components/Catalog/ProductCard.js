import React, { useState } from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart();
    
    // Сброс анимации через 1 секунду
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className={`product-card ${product.isNew ? 'new' : ''}`}>
      {product.isNew && <div className="new-badge">Новинка</div>}
      <div className="product-image">
        <img 
          src={product.image} 
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://via.placeholder.com/300?text=No+Image';
          }}
        />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <div className="price-quantity">
          <div className="price">
            {product.discount > 0 ? (
              <>
                <span className="current-price">
                  {Math.round(product.price * (1 - product.discount / 100))} руб
                </span>
                <span className="old-price">{product.price} руб</span>
                <span className="discount">-{product.discount}%</span>
              </>
            ) : (
              <span>{product.price} руб</span>
            )}
          </div>
          <div className="quantity">В наличии: {product.quantity} шт.</div>
        </div>
        <div className="weight">Вес: {product.weight} кг</div>
        <p className="description">{product.description}</p>
        <button 
          className={`add-to-cart-button ${isAdding ? 'adding' : ''}`}
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          <span className="button-text">
            {isAdding ? 'Добавлено!' : 'Добавить в корзину'}
          </span>
          <span className="cart-icon">🛒</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;