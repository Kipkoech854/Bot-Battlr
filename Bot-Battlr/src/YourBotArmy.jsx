import React from 'react';
import './App.css'

function YourBotArmy({ bots, onRender, onDelete }) {
    return (
      <div id='army-wrapper'>
        <h3>My Bot Army</h3>
        <div id="army-collection">
          {bots.map((bot) => (
            <div key={bot.id}>
              <button onClick={() => onRender(bot)}>
                <div id="army-poster">
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
  
  


export default YourBotArmy;
