import React, { useState } from 'react';
import './styles.css';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [exactMatch, setExactMatch] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm, exactMatch);
  };

  const handleReset = () => {
    setSearchTerm('');
    setExactMatch(false);
    onSearch('', false);
  };

  return (
    <div className="search-container">
      <h2>Поиск товаров</h2>
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Введите название товара"
          />
          <button type="submit" className="search-button">
            Поиск
          </button>
          <button type="button" onClick={handleReset} className="reset-button">
            Сброс
          </button>
        </div>
        <div className="search-options">
          <label>
            <input
              type="checkbox"
              checked={exactMatch}
              onChange={() => setExactMatch(!exactMatch)}
            />
            Точное совпадение
          </label>
        </div>
      </form>
    </div>
  );
};

export default Search;