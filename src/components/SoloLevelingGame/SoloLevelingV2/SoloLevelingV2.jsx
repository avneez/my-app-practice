import React, { useState, useEffect } from 'react';
import './index.css';

const Monster = {
  name: 'Goblin',
  level: 1,
  health: 10,
  attack: 3,
  position: { x: 50, y: 200 } // Initial position of the monster
};

const Player = {
  level: 1,
  maxHealth: 20,
  health: 20,
  attack: 5,
  experience: 0,
  experienceToLevelUp: 10,
  position: { x: 200, y: 200 }, // Initial position of the player
};

function SoloLevelingV2() {
  const [player, setPlayer] = useState(Player);
  const [monsters, setMonsters] = useState([Monster]);
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    const handleKeyPress = (event) => {
      const speed = 5;
      switch(event.key) {
        case 'w':
          setPlayer(prevPlayer => ({
            ...prevPlayer,
            position: { x: prevPlayer.position.x, y: prevPlayer.position.y - speed }
          }));
          break;
        case 'a':
          setPlayer(prevPlayer => ({
            ...prevPlayer,
            position: { x: prevPlayer.position.x - speed, y: prevPlayer.position.y }
          }));
          break;
        case 's':
          setPlayer(prevPlayer => ({
            ...prevPlayer,
            position: { x: prevPlayer.position.x, y: prevPlayer.position.y + speed }
          }));
          break;
        case 'd':
          setPlayer(prevPlayer => ({
            ...prevPlayer,
            position: { x: prevPlayer.position.x + speed, y: prevPlayer.position.y }
          }));
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  
  const handleAttack = () => {
    const playerX = player.position.x;
    const playerY = player.position.y;
  
    // Loop through monsters
    const updatedMonsters = monsters.filter(monster => {
      const monsterX = monster.position.x;
      const monsterY = monster.position.y;
      
      // Calculate distance between player and monster
      const distance = Math.sqrt(Math.pow((monsterX - playerX), 2) + Math.pow((monsterY - playerY), 2));
      
      // If distance is less than a threshold, attack the monster
      if (distance < 50) {
        setMessage(`You killed the ${monster.name}!`);
        return false;
      }
      return true;
    });
  
    setMonsters(updatedMonsters);
  };
  

  return (
    <div className="App" onMouseDown={handleAttack}>
      <h1>Solo Leveling Game</h1>
      <div className="instructions">
        <h2>How to Play!</h2>
        <p>Use the W,A,S,D keys to move the player character.</p>
        <p>Left Click on the monsters to attack and kill them.</p>
      </div>
      <div className="stats">
        <p>Player Level: {player.level}</p>
        <p>Player Health: {player.health}</p>
        <p>Player Experience: {player.experience}</p>
      </div>
      <div className="game-container">
        <div className="player" style={{ top: player.position.y, left: player.position.x }}></div>
        {monsters.map((monster, index) => (
          <div key={index} className="monster" style={{ top: monster.position.y, left: monster.position.x }}></div>
        ))}
      </div>
      <p className="message">{message}</p>
    </div>
  );
}

export default SoloLevelingV2;