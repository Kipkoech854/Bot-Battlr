import React, { useEffect, useState } from 'react';
import BotCollection from './BotCollection';
import YourBotArmy from './YourBotArmy';
import './App.css';
import Header from './Header';
import Sort from './sort';
import Filter from './Filter';

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
  function handleSort(category, order) {
    const sorted = [...bots].sort((a, b) => {
      const valA = parseFloat(a[category]);
      const valB = parseFloat(b[category]);
  
      return order === 'asc' ? valA - valB : valB - valA;
    });
  
    setBots(sorted);
    setArmy(sorted);
    
  }
  function handleFilter(selectedClass) {
    const filtered = bots.filter(bot => bot.bot_class === selectedClass);
    setBots(filtered);
    setArmy(filtered);
  }
  
  return (
    <div>
      <Header />
      <Sort  onSort={handleSort}/>
      <Filter bots={bots} onFilter={handleFilter} />
      <div id = "wrapper">
      <BotCollection bots={bots} onRender={handleAddToArmy}/>
      <YourBotArmy bots={army} onRender={removeFromArmy}/>
      </div>
    </div>
  );
}

export default App;

