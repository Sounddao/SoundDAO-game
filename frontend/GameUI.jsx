import React from 'react';

const GameUI = ({ playerStats, challenges }) => {
    return (
        <div>
            <h1>Player Stats</h1>
            <ul>
                <li>Name: {playerStats.name}</li>
                <li>Score: {playerStats.score}</li>
                <li>Level: {playerStats.level}</li>
            </ul>

            <h2>Challenges</h2>
            <ul>
                {challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                ))}
            </ul>
        </div>
    );
};

export default GameUI;