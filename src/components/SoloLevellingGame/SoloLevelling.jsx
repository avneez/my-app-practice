import React, { useState } from 'react';
import './index.css';

const Monster = {
  name: 'Goblin',
  level: 1,
  health: 10,
  attack: 3,
};

const Player = {
  level: 1,
  maxHealth: 20,
  health: 20,
  attack: 5,
  experience: 0,
  experienceToLevelUp: 10,
};

function SoloLevelling() {
  const [player, setPlayer] = useState(Player);
  const [message, setMessage] = useState('');

  const fightMonster = () => {
    const playerAttack = Math.floor(Math.random() * player.attack) + 1;
    const monsterAttack = Math.floor(Math.random() * Monster.attack) + 1;

    if (playerAttack >= monsterAttack) {
      const experienceGained = Monster.level * 2;
      const newExperience = player.experience + experienceGained;
      let newLevel = player.level;
      let newHealth = player.health;

      if (newExperience >= player.experienceToLevelUp) {
        newLevel += 1;
        newHealth = player.maxHealth + 5 * newLevel;
      }

      setPlayer({
        ...player,
        level: newLevel,
        health: newHealth,
        experience: newExperience,
      });

      setMessage(`You defeated the ${Monster.name} and gained ${experienceGained} experience points.`);
    } else {
      setMessage(`You were defeated by the ${Monster.name}. Game Over!`);
    }
  };

  return (
    <div className="main">
        <div>
            <h1>Solo Leveling Game</h1>
            <div className="stats">
                <p>Player Level: {player.level}</p>
                <p>Player Health: {player.health}</p>
                <p>Player Experience: {player.experience}</p>
            </div>
        </div>
        <div>
            <button onClick={fightMonster}><b>Fight Monster</b></button>
            <p className="message">{message}</p>
        </div>
    </div>
  );
}

export default SoloLevelling;
