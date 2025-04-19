import React, { useState } from 'react';
import './App.css';

function BotCollection({ bots, onRender, onDelete }) {
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
        <button onClick={hideDetails} className="back-button">← Back to Collection</button>
      </div>
    );
  }

  return (
    <div id="collection-wrapper">
      <h3>Bot Collection</h3>
      <div id="bot-collection">
        {bots.map((bot) => (
          <div key={bot.id}>
            <button onClick={() => showDetails(bot)}>
              <div id="poster">
                <img src={bot.avatar_url} alt="bot" width="150" />
                <p><strong>Name:</strong> {bot.name}</p>
                <p><strong>Health:</strong> {bot.health}</p>
                <p><strong>Damage:</strong> {bot.damage}</p>
                <p><strong>Armor:</strong> {bot.armor}</p>
                <p><strong>Class:</strong> {bot.bot_class}</p>
                <button class ="add-collectionbutton" onClick={(e) => {
                  e.stopPropagation();
                  onRender(bot);
                }}>Add to Army</button>
                <button onClick={(e) => {
                  e.stopPropagation();
                  onDelete(bot);
                }} id="permanent-delete">❌</button>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BotCollection;
