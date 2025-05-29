import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../cartSlice';
import SortTable from './SortTable';
import ProductCard from './ProductCard';
import Search from './Search';
import OrderForm from './OrderForm';
import './styles.css';

import watch1 from './images/watch1.png';
import watch2 from './images/watch2.png';
import watch3 from './images/watch3.png';

const CatalogView = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [addedProductId, setAddedProductId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const initialProducts = [
    {
      id: 1,
      name: 'Смарт-часы SuperWatch',
      price: 9999,
      quantity: 25,
      weight: 0.45,
      image: watch1,
      description: 'Водонепроницаемые спортивные часы с Android 4.42 на борту. Мощный двухъядерный процессор, GPS, шагомер, пульсометр.',
      isNew: true,
      discount: 20
    },
    {
      id: 2,
      name: 'Смарт-часы AirBlade',
      price: 11990,
      quantity: 11,
      weight: 0.38,
      image: watch2,
      description: 'Смарт-часы с функцией телефона! 2 Гб оперативной памяти, совместимы с Android и iOS.',
      isNew: false,
      discount: 0
    },
    {
      id: 3,
      name: 'Умные часы ProFit',
      price: 14990,
      quantity: 8,
      weight: 0.52,
      image: watch3,
      description: 'Профессиональные часы для фитнеса с расширенными функциями здоровья и тренировок.',
      isNew: true,
      discount: 15
    }
  ];

  const [products, setProducts] = useState([...initialProducts]);
  const [displayedProducts, setDisplayedProducts] = useState([...initialProducts]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  });

  const handleSort = (key) => {
    let direction = 'asc';
    
    if (sortConfig.key === key) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }
    
    const newSortConfig = { key, direction };
    setSortConfig(newSortConfig);
    
    const sortedProducts = [...displayedProducts].sort((a, b) => {
      if (typeof a[key] === 'string') {
        return direction === 'asc' 
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }

      if (typeof a[key] === 'boolean') {
        return direction === 'asc' 
          ? (a[key] === b[key] ? 0 : a[key] ? -1 : 1)
          : (a[key] === b[key] ? 0 : a[key] ? 1 : -1);
      }

      return direction === 'asc' 
        ? a[key] - b[key]
        : b[key] - a[key];
    });

    setDisplayedProducts(sortedProducts);
  };

  const handleSearch = (term, exactMatch) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setDisplayedProducts([...initialProducts]);
      return;
    }

    const filteredProducts = initialProducts.filter(product => {
      if (exactMatch) {
        return product.name.toLowerCase() === term.toLowerCase();
      } else {
        return product.name.toLowerCase().includes(term.toLowerCase());
      }
    });

    setDisplayedProducts(filteredProducts);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      ...product,
      quantity: 1
    }));
    setAddedProductId(product.id);
    
    setTimeout(() => setAddedProductId(null), 1000);
  };

  return (
    <div className="catalog-view">
      <h1>Каталог товаров</h1>
      
      <Search 
        onSearch={handleSearch}
        searchTerm={searchTerm}
      />
      
      {displayedProducts.length === 0 ? (
        <div className="no-results">
          <h3>Товары не найдены</h3>
          <p>Попробуйте изменить параметры поиска</p>
        </div>
      ) : (
        <>
          <div className="search-results-count">
            Найдено товаров: {displayedProducts.length}
            {searchTerm && (
              <span className="search-term"> по запросу: "{searchTerm}"</span>
            )}
          </div>
          
          <div className="view-toggle">
            <h2>Табличное представление</h2>
            <SortTable 
              products={displayedProducts} 
              onSort={handleSort}
              sortConfig={sortConfig}
            />
          </div>
          
          <div className="view-toggle">
            <h2>Карточки товаров</h2>
            <div className="product-grid">
              {displayedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={() => handleAddToCart(product)}
                  isAdded={addedProductId === product.id}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {cartItems.length > 0 && (
        <button 
          className="order-button"
          onClick={() => setShowOrderForm(true)}
        >
          Оформить заказ ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
        </button>
      )}

      {showOrderForm && (
        <OrderForm 
          onClose={() => setShowOrderForm(false)}
          products={initialProducts}
        />
      )}
    </div>
  );
};

export default CatalogView;