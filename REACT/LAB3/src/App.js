import React from 'react';
import EmailForm from './components/EmailForm';
import ProductCatalog from './components/ProductCatalog';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Лабораторная работа №3</h1>
      
      <section>
        <h2>Задание 1: Форма email</h2>
        <EmailForm />
      </section>
      
      <section>
        <h2>Задание 2: Каталог товаров</h2>
        <ProductCatalog />
      </section>
    </div>
  );
}

export default App;