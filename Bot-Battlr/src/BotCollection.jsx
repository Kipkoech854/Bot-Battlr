import React from "react";
import './App.css'

function BotCollection({ bots, onRender, onDelete }) {
  return (
    <div id='collection-wrapper'>
      <h3>Bot Collection</h3>
      <div id="bot-collection">
        {bots.map((bot) => (
          <div key={bot.id}>
            <button onClick={() => onRender(bot)}>
              <div id="poster">
                <img src={bot.avatar_url} alt="bot" width="150" />
                <p><strong>Name:</strong> {bot.name}</p>
                <p><strong>Health:</strong> {bot.health}</p>
                <p><strong>Damage:</strong> {bot.damage}</p>
                <p><strong>Armor:</strong> {bot.armor}</p>
                <p><strong>Class:</strong> {bot.bot_class}</p> 
                <button id="permanent-delete" onClick={() => onDelete(bot)}>❌</button>
              </div>
            </button>
          
          </div>
        ))}
      </div>
    </div>
  );
}

export default BotCollection;