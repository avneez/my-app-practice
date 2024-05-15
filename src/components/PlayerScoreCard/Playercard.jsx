import React, { useState } from 'react';

const players = ['Akshat', 'Avneez', 'Amritesh', 'Abhishek'];

const Scorecard = (props) => {
    const { pname, score, onScoreChange } = props
    return (
        <div>
            <h3>{pname}</h3>
            <div style={{ display: 'flex', width: "100%", padding: "5px" }}>
                <button onClick={() => onScoreChange(pname, 1)}>+</button>
                <span style={{ padding: "5px" }}>Score: {score}</span>
                <button onClick={() => onScoreChange(pname, -1)}>-</button>
            </div>
        </div>
    );
};

const Playercard = () => {
    const [selectedPlayer, setSelectedPlayer] = useState('Avneez');
    const [playerScores, setPlayerScores] = useState({});

    const handleScoreChange = (playerName, increment) => {
        setPlayerScores(prevScores => ({
            ...prevScores,
            [playerName]: (prevScores[playerName] || 0) + increment
        }));
    };

    const handleResetPlayerScore = (playerName) => {
        setPlayerScores(prevScores => ({
            ...prevScores,
            [playerName]: 0
        }));
    };

    return (
        <div>
            <select
                value={selectedPlayer}
                onChange={(e) => setSelectedPlayer(e.target.value)}
            >
                {players.map((player) => (
                    <option value={player} key={player}>{player}</option>
                ))}
            </select>
            <Scorecard
                key={selectedPlayer}
                pname={selectedPlayer}
                score={playerScores[selectedPlayer] || 0}
                onScoreChange={handleScoreChange}
            />
            <div>
                <button onClick={() => handleResetPlayerScore(selectedPlayer)}>Reset Player Score</button>
            </div>
            <div>
                <button onClick={() => setPlayerScores({})}>Reset All</button>
            </div>
        </div>
    );
};

export default Playercard;
