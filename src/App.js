import React, { useState } from 'react';
import './App.css';

function App() {
  // State for goal, current savings, and calculation
  const [goal, setGoal] = useState('');
  const [current, setCurrent] = useState('');
  const [remaining, setRemaining] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleGoalChange = (e) => {
    setGoal(e.target.value);
  };

  const handleCurrentChange = (e) => {
    setCurrent(e.target.value);
  };

  const calculateProgress = () => {
    if (goal && current) {
      const remainingAmount = goal - current;
      const progressPercentage = (current / goal) * 100;
      setRemaining(remainingAmount);
      setProgress(progressPercentage);
    }
  };

  const reset = () => {
    setGoal('');
    setCurrent('');
    setRemaining(null);
    setProgress(0);
  };

  return (
    <div className="App">
      <h1>Savings Goal Tracker</h1>
      
      <div>
        <label>
          Total Goal Amount:
          <input 
            type="number" 
            value={goal} 
            onChange={handleGoalChange} 
            placeholder="Enter your goal"
          />
        </label>
      </div>

      <div>
        <label>
          Current Savings:
          <input 
            type="number" 
            value={current} 
            onChange={handleCurrentChange} 
            placeholder="Enter your current savings"
          />
        </label>
      </div>

      <button onClick={calculateProgress}>Calculate Progress</button>

      {remaining !== null && (
        <div>
          <h2>Remaining Amount: ${remaining}</h2>
          <h3>Progress: {progress.toFixed(2)}%</h3>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}

      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
