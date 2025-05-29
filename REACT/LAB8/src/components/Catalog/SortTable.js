import React from 'react';
import './styles.css';

const SortTable = ({ products, onSort, sortConfig }) => {
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <table className="sort-table">
      <thead>
        <tr>
          <th onClick={() => onSort('name')}>
            Наименование {getSortIndicator('name')}
          </th>
          <th onClick={() => onSort('price')}>
            Стоимость {getSortIndicator('price')}
          </th>
          <th onClick={() => onSort('quantity')}>
            Количество {getSortIndicator('quantity')}
          </th>
          <th onClick={() => onSort('weight')}>
            Масса {getSortIndicator('weight')}
          </th>
          <th>Изображение</th>
          <th onClick={() => onSort('discount')}>
            Скидка {getSortIndicator('discount')}
          </th>
          <th onClick={() => onSort('isNew')}>
            Новинка {getSortIndicator('isNew')}
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>
              {product.discount > 0 ? (
                <>
                  <span className="discounted-price">
                    {Math.round(product.price * (1 - product.discount / 100))} руб
                  </span>
                  <span className="original-price">{product.price} руб</span>
                </>
              ) : (
                <span>{product.price} руб</span>
              )}
            </td>
            <td>{product.quantity} шт.</td>
            <td>{product.weight} кг</td>
            <td>
              <img 
                src={product.image} 
                alt={product.name} 
                className="thumbnail"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = 'https://via.placeholder.com/60?text=No+Image';
                }}
              />
            </td>
            <td>{product.discount}%</td>
            <td>{product.isNew ? 'Да' : 'Нет'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortTable;