import React, { useState } from 'react';
import FormPage from './FormPage'; // Assuming FormPage.js is in the same directory
import ResultsPage from './ResultsPage'; // Assuming ResultsPage.js is in the same directory
import './App.css';
import SimulationPage from './SimulationPage';

function App() {
  const [runners, setRunners] = useState([]);
  const [activeTab, setActiveTab] = useState('form');

  const handleFormSubmit = (runner) => {
    // Check for duplicate names
    if (runners.some(r => r.name === runner.name)) {
      alert('A runner with this name already exists.');
      return;
    }

    setRunners(prevRunners => [...prevRunners, runner].sort((a, b) => a.time - b.time));
    setActiveTab('results');
  };
  return (
    <div className="App">
      <div>
        <button onClick={() => setActiveTab('form')}>Form</button>
        <button onClick={() => setActiveTab('results')}>Results</button>
        <button onClick={() => setActiveTab('simulation')}>Simulation</button>
      </div>

      {activeTab === 'form' && <FormPage onFormSubmit={handleFormSubmit} existingRunners={runners} />}
      {activeTab === 'results' && <ResultsPage runners={runners} />}
      {activeTab === 'simulation' && <SimulationPage runners={runners} />}
    </div>
  );
  return (
    <div className="App">
      <div>
        <button onClick={() => setActiveTab('form')}>Form</button>
        <button onClick={() => setActiveTab('results')}>Results</button>
      </div>
      
      {activeTab === 'form' && <FormPage onFormSubmit={handleFormSubmit} existingRunners={runners} />}
      {activeTab === 'results' && <ResultsPage runners={runners} />}
    </div>
  );
}

export default App;
