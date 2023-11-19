import React, { useState } from 'react';
// ... [rest of your imports]

function SimulationPage({ runners }) {
  const [selectedRunner1, setSelectedRunner1] = useState('');
  const [selectedRunner2, setSelectedRunner2] = useState('');

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
      time: totalTime - (totalTime * percent / 100)
    }));
  };

  const filteredRunnersForRunner2 = runners.filter(runner => runner.name !== selectedRunner1);
  const filteredRunnersForRunner1 = runners.filter(runner => runner.name !== selectedRunner2);

  return (
    <div>
      <h1>🎮 Simulation 🎮</h1>
      <div>
        <label>
          Runner #1:
          <select value={selectedRunner1} onChange={e => setSelectedRunner1(e.target.value)}>
            <option value="">Select Runner</option>
            {filteredRunnersForRunner1.map(runner => (
              <option key={runner.name} value={runner.name}>{runner.name}</option>
            ))}
          </select>
          {timeRunner1 !== null && <span> Time: {timeRunner1} seconds</span>}
        </label>
      </div>
      <div>
        <label>
          Runner #2:
          <select value={selectedRunner2} onChange={e => setSelectedRunner2(e.target.value)}>
            <option value="">Select Runner</option>
            {filteredRunnersForRunner2.map(runner => (
              <option key={runner.name} value={runner.name}>{runner.name}</option>
            ))}
          </select>
          {timeRunner2 !== null && <span> Time: {timeRunner2} seconds</span>}
        </label>
      </div>
      <div style={{ color: 'red' }}>
        <strong>Total Time: {totalTime} seconds</strong>
      </div>
      <div>
        <h2>📉 Potential Time Improvement 📉</h2>
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
                <td>{time.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
}

export default SimulationPage;
