import React from 'react';
import StockTable from './StockTable';
import ChessBoard from './ChessBoard';

function App() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  
  return (
    <div className="App">
      <h1>Лабораторная работа №1</h1>
      
      <section>
        <h2>Задание 1: Текущая дата</h2>
        <p>Сегодня: {formattedDate}</p>
      </section>
      
      <section>
        <h2>Задание 2: Таблица акций</h2>
        <StockTable />
      </section>
      
      <section>
        <h2>Задание 3: Шахматная доска</h2>
        <ChessBoard />
      </section>
    </div>
  );
}

export default App;