import React, { useState, useEffect } from 'react';
import { downloadCSV } from './utils'; // Ensure the correct import path

function SimulationPage({ runners }) {
  const [selectedRunner1, setSelectedRunner1] = useState('');
  const [selectedRunner2, setSelectedRunner2] = useState('');
  
  // Initialize savedSimulations from localStorage
  const [savedSimulations, setSavedSimulations] = useState(() => {
    const savedData = localStorage.getItem('savedSimulations');
    return savedData ? JSON.parse(savedData) : [];
  });

  // Save to localStorage whenever savedSimulations changes
  useEffect(() => {
    localStorage.setItem('savedSimulations', JSON.stringify(savedSimulations));
  }, [savedSimulations]);

  const getRunnerTime = (runnerName) => {
    const runner = runners.find(r => r.name === runnerName);
    return runner ? runner.time : null;
  };

  const timeRunner1 = getRunnerTime(selectedRunner1);
  const timeRunner2 = getRunnerTime(selectedRunner2);
  const totalTime = (timeRunner1 || 0) + (timeRunner2 || 0);

  const improvementPercents = [1, 3, 5, 7, 10];

  const calculateImprovedTimes = () => {
    return improvementPercents.map(percent => ({
      percent,
      time: (totalTime - (totalTime * percent / 100)).toFixed(2)
    }));
  };

  const handleSaveSimulation = () => {
    const newSimulation = {
      runners: [selectedRunner1, selectedRunner2],
      totalTime: totalTime.toFixed(2),
      improvements: calculateImprovedTimes().map(imp => imp.time)
    };

    setSavedSimulations(prevSimulations => {
      const updatedSimulations = [...prevSimulations, newSimulation];
      return updatedSimulations.sort((a, b) => parseFloat(a.totalTime) - parseFloat(b.totalTime));
    });
  };

  const handleExportSavedSimulations = () => {
    const dataForCSV = savedSimulations.map((sim, index) => {
      return {
        "Rank": index + 1,
        "Runners": sim.runners.filter(Boolean).join(' & '),
        "Total Time (seconds)": sim.totalTime,
        ...sim.improvements.reduce((acc, time, idx) => {
          acc[`${improvementPercents[idx]}%`] = time;
          return acc;
        }, {})
      };
    });
    downloadCSV(dataForCSV, 'saved_simulations.csv');
  };

  return (
    <div>
      <h1>🎮 Simulation 🎮</h1>

      {/* Dropdown for Runner #1 */}
      <div>
        <label>
          Runner #1:
          <select value={selectedRunner1} onChange={e => setSelectedRunner1(e.target.value)}>
            <option value="">Select Runner</option>
            {runners.map(runner => (
              <option key={runner.name} value={runner.name}>{runner.name}</option>
            ))}
          </select>
          {timeRunner1 !== null && <span> Time: {timeRunner1} seconds</span>}
        </label>
      </div>

      {/* Dropdown for Runner #2 */}
      <div>
        <label>
          Runner #2:
          <select value={selectedRunner2} onChange={e => setSelectedRunner2(e.target.value)}>
            <option value="">Select Runner</option>
            {runners.map(runner => (
              <option key={runner.name} value={runner.name}>{runner.name}</option>
            ))}
          </select>
          {timeRunner2 !== null && <span> Time: {timeRunner2} seconds</span>}
        </label>
      </div>

      <div>
        <strong>Total Time: {totalTime.toFixed(2)} seconds</strong>
      </div>

      {/* Potential Improvement Table */}
      <h2>Potential Time Improvement</h2>
      <table>
        <thead>
          <tr>
            <th>Improvement</th>
            <th>New Total Time (seconds)</th>
          </tr>
        </thead>
        <tbody>
          {calculateImprovedTimes().map(({ percent, time }) => (
            <tr key={percent}>
              <td>{percent}%</td>
              <td>{time}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Save Simulation Button */}
      <button onClick={handleSaveSimulation}>Save Simulation</button>

      {/* Saved Simulations Table */}
      <h2>Saved Simulations</h2>
      <button onClick={handleExportSavedSimulations} style={{ backgroundColor: 'red', color: 'white' }}>Export Saved Simulations as CSV</button>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Runners</th>
            <th>Total Time</th>
            {improvementPercents.map(percent => <th key={percent}>{percent}%</th>)}
          </tr>
        </thead>
        <tbody>
          {savedSimulations.map((simulation, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{simulation.runners.filter(Boolean).join(' & ')}</td>
              <td>{simulation.totalTime}</td>
              {simulation.improvements.map((time, idx) => <td key={idx}>{time}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SimulationPage;
