import React from 'react';
// ... [rest of your imports]
  
function ResultsPage({ runners }) {
    const averageTime = runners.length > 0
        ? (runners.reduce((acc, runner) => acc + runner.time, 0) / runners.length).toFixed(2)
        : 0;

    return (
        <div>
            <h1>🏆 Runner Results 🏆</h1>
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
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{runner.name}</td>
                            <td>{runner.time}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3">Average Time: {averageTime} seconds</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );

}

export default ResultsPage;
