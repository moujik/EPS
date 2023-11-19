import React, { useState } from 'react';

function FormPage({ onFormSubmit, existingRunners }) {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !time) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    if (existingRunners.some(runner => runner.name === name)) {
      setErrorMessage('A runner with this name already exists.');
      return;
    }

    onFormSubmit({ name, time: Number(time) });
    setName('');
    setTime('');
    setErrorMessage('');
  };

  return (
    <div>
      <h1>🏃‍♂️ Runner Entry Form 🏃‍♀️</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Time (in seconds):
          <input type="number" value={time} onChange={(e) => setTime(e.target.value)} />
        </label>
        <button type="submit">Submit 🚀</button>
      </form>
    </div>
  );
}

export default FormPage;
