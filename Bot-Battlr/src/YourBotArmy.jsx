import React, { useState } from 'react';
import './App.css';

function YourBotArmy({ bots, onRender, onDelete }) {
  const [selectedBot, setSelectedBot] = useState(null);

  function showDetails(bot) {
    setSelectedBot(bot);
  }

  function hideDetails() {
    setSelectedBot(null);
  }

  if (selectedBot) {
    return (
      <div className="details-wrapper pop-animation">
        <img src={selectedBot.avatar_url} alt="bot" width="200" />
        <h2>{selectedBot.name}</h2>
        <p><strong>Catchphrase:</strong> {selectedBot.catchphrase}</p>
        <p><strong>Created At:</strong> {new Date(selectedBot.created_at).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(selectedBot.updated_at).toLocaleString()}</p>
        <button onClick={hideDetails} className="back-button">← Back to Army</button>
      </div>
    );
  }

  return (
    <div id="army-wrapper">
      <h3>My Bot Army</h3>
      <div id="army-collection">
        {bots.map((bot) => (
          <div key={bot.id}>
            <button onClick={() => showDetails(bot)}>
              <div id="army-poster">
                <img src={bot.avatar_url} alt="bot" width="150" />
                <p><strong>Name:</strong> {bot.name}</p>
                <p><strong>Health:</strong> {bot.health}</p>
                <p><strong>Damage:</strong> {bot.damage}</p>
                <p><strong>Armor:</strong> {bot.armor}</p>
                <p><strong>Class:</strong> {bot.bot_class}</p>
                <button
                  className="add-armybutton"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRender(bot);
                  }}
                >
                  Remove from Army
                </button>
                <button
                  id="permanent-delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(bot);
                  }}
                >
                  ❌
                </button>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YourBotArmy;
