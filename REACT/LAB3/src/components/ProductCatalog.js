import React, { useState } from 'react';
import './ProductCatalog.css';

const ProductCatalog = () => {
  const initialProducts = [
    { id: 1, name: 'Ноутбук', price: 1500, quantity: 5 },
    { id: 2, name: 'Смартфон', price: 800, quantity: 2 },
    { id: 3, name: 'Планшет', price: 500, quantity: 0 },
    { id: 4, name: 'Наушники', price: 150, quantity: 10 },
    { id: 5, name: 'Клавиатура', price: 100, quantity: 1 },
    { id: 6, name: 'Мышь', price: 50, quantity: 8 },
    { id: 7, name: 'Монитор', price: 300, quantity: 3 },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const getTotalQuantity = () => {
    return products.reduce((sum, product) => sum + product.quantity, 0);
  };

  const getTotalPrice = () => {
    return products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  };

  const getRowClass = (quantity) => {
    if (quantity === 0) return 'out-of-stock';
    if (quantity < 3) return 'low-stock';
    return '';
  };

  return (
    <div className="product-catalog">
      <h2>Каталог товаров</h2>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th onClick={() => requestSort('name')}>
              Название {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => requestSort('price')}>
              Цена {sortConfig.key === 'price' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => requestSort('quantity')}>
              Количество {sortConfig.key === 'quantity' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product, index) => (
            <tr key={product.id} className={getRowClass(product.quantity)}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="totals">
        <p>Общее количество товаров: {getTotalQuantity()}</p>
        <p>Общая стоимость: ${getTotalPrice()}</p>
      </div>
    </div>
  );
};

export default ProductCatalog;