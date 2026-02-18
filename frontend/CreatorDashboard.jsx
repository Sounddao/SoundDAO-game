import React, { useState, useEffect } from 'react';
import './CreatorDashboard.css';

const CreatorDashboard = ({ account }) => {
  const [isCreator, setIsCreator] = useState(false);
  const [royaltyRate, setRoyaltyRate] = useState(10);
  const [fundingGoal, setFundingGoal] = useState('');
  const [duration, setDuration] = useState(30);
  const [fundingRounds, setFundingRounds] = useState([]);

  const registerCreator = async () => {
    try {
      alert(`Registering as creator with ${royaltyRate}% royalty rate`);
      setIsCreator(true);
    } catch (error) {
      console.error('Error registering creator:', error);
    }
  };

  const createFundingRound = async () => {
    try {
      if (!fundingGoal) {
        alert('Please enter a funding goal');
        return;
      }
      alert(`Creating funding round: ${fundingGoal} SND for ${duration} days`);
      const newRound = {
        id: fundingRounds.length + 1,
        goal: fundingGoal,
        raised: 0,
        duration: duration,
        active: true
      };
      setFundingRounds([...fundingRounds, newRound]);
      setFundingGoal('');
    } catch (error) {
      console.error('Error creating funding round:', error);
    }
  };

  return (
    <div className="creator-dashboard">
      <h2>Creator Dashboard</h2>
      
      {!isCreator ? (
        <div className="register-section">
          <h3>Register as Creator</h3>
          <div className="form-group">
            <label>Royalty Rate (%)</label>
            <input
              type="number"
              value={royaltyRate}
              onChange={(e) => setRoyaltyRate(e.target.value)}
              min="0"
              max="100"
            />
          </div>
          <button onClick={registerCreator} className="register-btn">
            Register as Creator
          </button>
        </div>
      ) : (
        <div className="creator-content">
          <div className="funding-form">
            <h3>Create Funding Round</h3>
            <div className="form-group">
              <label>Funding Goal (SND)</label>
              <input
                type="number"
                value={fundingGoal}
                onChange={(e) => setFundingGoal(e.target.value)}
                placeholder="Enter amount"
              />
            </div>
            <div className="form-group">
              <label>Duration (days)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                min="1"
              />
            </div>
            <button onClick={createFundingRound} className="create-btn">
              Create Funding Round
            </button>
          </div>

          <div className="funding-rounds">
            <h3>Your Funding Rounds</h3>
            {fundingRounds.length === 0 ? (
              <p>No funding rounds yet</p>
            ) : (
              <div className="rounds-grid">
                {fundingRounds.map(round => (
                  <div key={round.id} className="round-card">
                    <h4>Round #{round.id}</h4>
                    <p>Goal: {round.goal} SND</p>
                    <p>Raised: {round.raised} SND</p>
                    <p>Duration: {round.duration} days</p>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${(round.raised / round.goal) * 100}%` }}
                      />
                    </div>
                    <span className={round.active ? 'status-active' : 'status-complete'}>
                      {round.active ? 'Active' : 'Completed'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorDashboard;