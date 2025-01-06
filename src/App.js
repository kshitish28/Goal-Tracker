import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State for the list of goals and theme
  const [goals, setGoals] = useState([]);
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [theme, setTheme] = useState('light'); // Theme state (light or dark)

  // Load goals and theme from localStorage on initial render
  useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
    const savedTheme = localStorage.getItem('theme') || 'light';
    setGoals(savedGoals);
    setTheme(savedTheme);
  }, []);

  // Save goals and theme to localStorage whenever goals or theme change
  useEffect(() => {
    if (goals.length > 0) {
      localStorage.setItem('goals', JSON.stringify(goals));
    }
    localStorage.setItem('theme', theme);
  }, [goals, theme]);

  const handleGoalNameChange = (e) => {
    setGoalName(e.target.value);
  };

  const handleGoalAmountChange = (e) => {
    setGoalAmount(e.target.value);
  };

  const handleCurrentSavingsChange = (e) => {
    setCurrentSavings(e.target.value);
  };

  const calculateProgress = (goal) => {
    const remainingAmount = goal.goalAmount - goal.currentSavings;
    const progressPercentage = (goal.currentSavings / goal.goalAmount) * 100;
    return { remainingAmount, progressPercentage };
  };

  const addGoal = () => {
    if (goalName && goalAmount && currentSavings) {
      const newGoal = {
        id: new Date().getTime(),
        name: goalName,
        goalAmount: parseFloat(goalAmount),
        currentSavings: parseFloat(currentSavings),
      };
      setGoals([...goals, newGoal]);
      setGoalName('');
      setGoalAmount('');
      setCurrentSavings('');
    } else {
      alert('Please fill all fields');
    }
  };

  const resetGoals = () => {
    setGoals([]);
    localStorage.removeItem('goals');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`App ${theme}`}>
      <h1>Savings Goal Tracker</h1>
      
      <div>
        <label>
          Goal Name:
          <input 
            type="text" 
            value={goalName} 
            onChange={handleGoalNameChange} 
            placeholder="Enter goal name"
          />
        </label>
      </div>

      <div>
        <label>
          Total Goal Amount:
          <input 
            type="number" 
            value={goalAmount} 
            onChange={handleGoalAmountChange} 
            placeholder="Enter goal amount"
          />
        </label>
      </div>

      <div>
        <label>
          Current Savings:
          <input 
            type="number" 
            value={currentSavings} 
            onChange={handleCurrentSavingsChange} 
            placeholder="Enter current savings"
          />
        </label>
      </div>

      <button onClick={addGoal}>Add Goal</button>

      <div className="goal-list">
        <h2>Your Goals</h2>
        {goals.length > 0 ? (
          goals.map((goal) => {
            const { remainingAmount, progressPercentage } = calculateProgress(goal);
            return (
              <div key={goal.id} className="goal">
                <h3>{goal.name}</h3>
                <p>Total Goal: ₹{goal.goalAmount}</p>
                <p>Current Savings: ₹{goal.currentSavings}</p>
                <p>Remaining Amount: ₹{remainingAmount}</p>
                <p>Progress: {progressPercentage.toFixed(2)}%</p>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-goals-message">No goals added yet.</p>
        )}
      </div>

      <button onClick={resetGoals} className="reset-button">Reset All Goals</button>

      <button onClick={toggleTheme} className="theme-toggle">
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
}

export default App;
