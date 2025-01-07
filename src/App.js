import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Goal tracking states
  const [goals, setGoals] = useState([]);
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editGoalId, setEditGoalId] = useState(null);

  // User registration/login states
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');
  const [theme, setTheme] = useState('light');

  // Load goals and theme from localStorage
  useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
    const savedTheme = localStorage.getItem('theme') || 'light';
    setGoals(savedGoals);
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (goals.length > 0) {
      localStorage.setItem('goals', JSON.stringify(goals));
    }
    localStorage.setItem('theme', theme);

    // Dynamically update background image when theme changes
    if (theme === 'light') {
      document.body.style.backgroundImage =
        "url('https://static.vecteezy.com/system/resources/thumbnails/038/973/288/small_2x/ai-generated-spring-meadow-with-big-tree-with-fresh-green-leaves-photo.jpg')";
    } else {
      document.body.style.backgroundImage =
        "url('https://wallpapers.com/images/hd/dark-nature-1920-x-1080-background-lqtolhf1sfr3ve5s.jpg')";
    }

    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
  }, [goals, theme]);

  // Goal functions
  const handleGoalNameChange = (e) => setGoalName(e.target.value);
  const handleGoalAmountChange = (e) => setGoalAmount(e.target.value);
  const handleCurrentSavingsChange = (e) => setCurrentSavings(e.target.value);

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

  const editGoal = (goal) => {
    setIsEditing(true);
    setGoalName(goal.name);
    setGoalAmount(goal.goalAmount.toString());
    setCurrentSavings(goal.currentSavings.toString());
    setEditGoalId(goal.id);
  };

  const updateGoal = () => {
    if (goalName && goalAmount && currentSavings) {
      const updatedGoals = goals.map((goal) =>
        goal.id === editGoalId
          ? {
              ...goal,
              name: goalName,
              goalAmount: parseFloat(goalAmount),
              currentSavings: parseFloat(currentSavings),
            }
          : goal
      );
      setGoals(updatedGoals);
      setIsEditing(false);
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

  // Theme toggle
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  // Login/Register functions
  const handleRegister = () => {
    if (username && password && email && fullName) {
      if (password === rePassword) {
        const newUser = { username, password, email, fullName };
        localStorage.setItem('user', JSON.stringify(newUser));
        setMessage('Registration successful! Please login.');
        setIsRegistering(false);
      } else {
        setMessage('Passwords do not match.');
      }
    } else {
      setMessage('Please fill all fields (username, email, password, full name, and re-enter password).');
    }
  };

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      setIsLoggedIn(true);
      setMessage('');
    } else {
      setMessage('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div className={`App ${theme}`}>
      <h1>Savings Goal Tracker</h1>

      {/* Login/Register Form */}
      {!isLoggedIn ? (
        <div>
          {isRegistering ? (
            <div>
              <h2>Register</h2>
              <input
                type="text"
                placeholder="Enter full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Re-enter password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              />
              <button onClick={handleRegister}>Register</button>
              <button onClick={() => setIsRegistering(false)}>Already have an account? Login</button>
            </div>
          ) : (
            <div>
              <h2>Login</h2>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin}>Login</button>
              <button onClick={() => setIsRegistering(true)}>Don't have an account? Register</button>
            </div>
          )}
          {message && <p>{message}</p>}
        </div>
      ) : (
        <div>
          <h2>Welcome, {fullName}!</h2>

          {/* Goal Form */}
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

          {isEditing ? (
            <button onClick={updateGoal}>Update Goal</button>
          ) : (
            <button onClick={addGoal}>Add Goal</button>
          )}

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
                    <p>Remaining Amount: ₹{remainingAmount.toFixed(2)}</p>
                    <p>Progress: {progressPercentage.toFixed(2)}%</p>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                    <button onClick={() => editGoal(goal)}>Edit</button>
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

          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;
