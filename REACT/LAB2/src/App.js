import React, { useState } from 'react';
import Clock from './components/Clock';
import JobSelector from './components/JobSelector';
import JobMenu from './components/JobMenu';
import './App.css';

function App() {
  const [selectedJob, setSelectedJob] = useState('developer');

  return (
    <div className="App">
      <h1>Лабораторная работа №2</h1>
      
      <section>
        <h2>Задание 1: Часы</h2>
        <Clock format="24" timezone="local" />
        <Clock format="12" timezone="+3:00" />
        <Clock format="24" timezone="-4:00" />
      </section>
      
      <section>
        <h2>Задание 2: Меню для профессий</h2>
        <JobSelector 
          selectedJob={selectedJob} 
          onJobChange={setSelectedJob} 
        />
        <JobMenu job={selectedJob} />
      </section>
    </div>
  );
}

export default App;