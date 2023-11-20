import React, { useState, useEffect } from 'react';
import './App.css'; // Make sure you have this line to include your CSS styles
import FormPage from './FormPage';
import ResultsPage from './ResultsPage';
import SimulationPage from './SimulationPage';

function App() {
  const [runners, setRunners] = useState([]);
  const [activeTab, setActiveTab] = useState('form');

  // Load and save runners to/from local storage
  useEffect(() => {
    const storedRunners = JSON.parse(localStorage.getItem('runners')) || [];
    setRunners(storedRunners);
  }, []);

  useEffect(() => {
    localStorage.setItem('runners', JSON.stringify(runners));
  }, [runners]);

  const handleFormSubmit = (runner) => {
    if (runners.some(r => r.name === runner.name)) {
      alert('A runner with this name already exists.');
      return;
    }
    setRunners(prevRunners => [...prevRunners, runner].sort((a, b) => a.time - b.time));
  };

  return (
    <div className="App">
      <div className="tab-buttons">
        <button onClick={() => setActiveTab('form')} className={activeTab === 'form' ? 'active' : ''}>📝 Form</button>
        <button onClick={() => setActiveTab('results')} className={activeTab === 'results' ? 'active' : ''}>🏆 Results</button>
        <button onClick={() => setActiveTab('simulation')} className={activeTab === 'simulation' ? 'active' : ''}>🔮 Simulation</button>
      </div>

      {activeTab === 'form' && <FormPage onFormSubmit={handleFormSubmit} existingRunners={runners} />}
      {activeTab === 'results' && <ResultsPage runners={runners} />}
      {activeTab === 'simulation' && <SimulationPage runners={runners} />}
    </div>
  );
}

export default App;
