import React from 'react';

const JobSelector = ({ selectedJob, onJobChange }) => {
  const jobs = [
    { id: 'developer', name: 'Разработчик' },
    { id: 'designer', name: 'Дизайнер' },
    { id: 'manager', name: 'Менеджер' },
    { id: 'analyst', name: 'Аналитик' },
    { id: 'tester', name: 'Тестировщик' }
  ];

  return (
    <div className="job-selector">
      <h3>Выберите профессию:</h3>
      <select 
        value={selectedJob} 
        onChange={(e) => onJobChange(e.target.value)}
      >
        {jobs.map((job) => (
          <option key={job.id} value={job.id}>
            {job.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default JobSelector;