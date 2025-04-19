import React, { useEffect, useState } from 'react';
import './App.css'


function BotCollection() {
  const [bots, setBots] = useState([]);
  const URL = 'http://localhost:3000/bots';

  useEffect(() => {
    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not fetch bots');
        }
        return response.json();
      })
      .then((data) => setBots(data))
      .catch((error) => console.error('Fetch error:', error));
  }, []);

  return (
    <div>
      <h3>Bot Collection</h3>
      <div id="bot-collection">
        {bots.map((bot) => (
          <div key={bot.id}>
            <button>
              <div>
                <img src={bot.avatar_url} alt="bot" width="150" />
                <p><strong>Name:</strong> {bot.name}</p>
                <p><strong>Health:</strong> {bot.health}</p>
                <p><strong>Damage:</strong> {bot.damage}</p>
                <p><strong>Armor:</strong> {bot.armor}</p>
                <p><strong>Class:</strong> {bot.bot_class}</p>
                <button id= 'parmanent-delete'>❌</button>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BotCollection;
