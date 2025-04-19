import React, { useEffect, useState } from 'react';
import BotCollection from './BotCollection';
import YourBotArmy from './YourBotArmy';
import './App.css';
import Header from './Header';

function App() {
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/bots')
      .then((res) => res.json())
      .then((data) => setBots(data))
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  function handleAddToArmy(bot) {
    if (!army.find(b => b.id === bot.id)) {
      setArmy([...army, bot]);
      setBots(bots.filter(b => b.id !== bot.id));
    }
  }
  function removeFromArmy(bot, id, index) {
    if (!bots.find(b => b.id === bot.id)) {
      const updatedBots = [...bots];
      updatedBots.splice(index, 0, bot);
      setBots(updatedBots);
    }
    setArmy(army.filter(b => b.id !== bot.id));
  }
  

  return (
    <div>
      <Header/>
      <div id = "wrapper">
      <BotCollection bots={bots} onRender={handleAddToArmy} />
      <YourBotArmy bots={army} onRender={removeFromArmy}/>
      </div>
    </div>
  );
}

export default App;

