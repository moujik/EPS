// ResultsPage.js
import React from 'react';
import { downloadCSV } from './utils'; // Ensure this path is correct

function ResultsPage({ runners }) {
  const handleDownload = () => {
    downloadCSV(runners, 'runners.csv');
  };

  const calculateAverageTime = () => {
    return runners.length > 0
      ? (runners.reduce((acc, runner) => acc + runner.time, 0) / runners.length).toFixed(2)
      : 0;
  };

  return (
    <div>
      <h1>🏃‍♂️ Runner Results 🏃‍♀️</h1>
      <button onClick={handleDownload}style={{ backgroundColor: 'red', color: 'white' }}>Export as CSV 📥</button>
      
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Time (seconds)</th>
          </tr>
        </thead>
        <tbody>
          {runners.map((runner, index) => (
            <tr key={runner.name}>
              <td>{index + 1}</td>
              <td>{runner.name}</td>
              <td>{runner.time}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">Average Time</td>
            <td>{calculateAverageTime()} seconds</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default ResultsPage;
