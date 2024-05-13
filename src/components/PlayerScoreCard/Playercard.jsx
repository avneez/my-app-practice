import React, { useState } from 'react';

const players = ['Akshat', 'Avneez', 'Amritesh', 'Abhishek'];

const Scorecard = (props) => {
  const { pname, score, onScoreChange } = props
  return (
      <div>
          <h3>{pname}</h3>
          <button onClick={() => onScoreChange(pname, 1)}>+</button>
          <p>Score: {score}</p>
          <button onClick={() => onScoreChange(pname, -1)}>-</button>
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
        </div>
    );
};

export default Playercard;
