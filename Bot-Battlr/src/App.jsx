import React, { useEffect, useState } from 'react';
import BotCollection from './BotCollection';
import YourBotArmy from './YourBotArmy';
import Header from './Header';
import Sort from './Sort';
import Filter from './Filter';
import './App.css';

function App() {
  const [bots, setBots] = useState([]);
  const [originalBots, setOriginalBots] = useState([]); // <- store full list
  const [army, setArmy] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [filterMessage, setFilterMessage] = useState('');

  const [deleteMessage, setDeleteMessage] = useState('');


  useEffect(() => {
    fetch('http://localhost:3000/bots')
      .then(res => res.json())
      .then(data => {
        setBots(data);
        setOriginalBots(data); // save original bots
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  function handleAddToArmy(bot) {
    if (!army.find(b => b.id === bot.id)) {
      setArmy([...army, bot]);
      setBots(bots.filter(b => b.id !== bot.id));
    }
  }

  function removeFromArmy(bot, index) {
    if (!bots.find(b => b.id === bot.id)) {
      const updatedBots = [...bots];
      updatedBots.splice(index, 0, bot);
      setBots(updatedBots);
    }
    setArmy(army.filter(b => b.id !== bot.id));
  }
  function handlePermanentDelete(bot) {
    fetch(`http://localhost:3000/bots/${bot.id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setBots(prev => prev.filter(b => b.id !== bot.id));
        setArmy(prev => prev.filter(b => b.id !== bot.id));
        setOriginalBots(prev => prev.filter(b => b.id !== bot.id));
        setDeleteMessage(`"${bot.name}" permanently deleted.`);
        setTimeout(() => setDeleteMessage(''), 3000); // Clear message after 3 seconds
      })
      .catch(err => console.error('Delete failed:', err));
  }
  
  

  function handleSort(category, order) {
    const sorted = [...bots].sort((a, b) => {
      const valA = parseFloat(a[category]);
      const valB = parseFloat(b[category]);
      return order === 'asc' ? valA - valB : valB - valA;
    });
    setBots(sorted);
  }

  function handleFilter(selectedClass) {
    if (activeFilter === selectedClass) {
      
      setBots(originalBots.filter(bot => !army.some(a => a.id === bot.id)));
      setActiveFilter(null);
      setFilterMessage('Restored');
      setTimeout(() => setFilterMessage(''), 3000); 
    } else {
      const filtered = originalBots.filter(
        bot => bot.bot_class === selectedClass && !army.some(a => a.id === bot.id)
      );
      setBots(filtered);
      setActiveFilter(selectedClass);
      setFilterMessage('Click again to restore');
      setTimeout(() => setFilterMessage(''), 3000);
    }
  }
  

  return (
    <div>
      <Header />
      <Sort sort={handleSort} />
      <Filter bots={originalBots} onFilter={handleFilter} />
      {filterMessage && (
  <div className="filter-message">
    {filterMessage}
  </div>
)}

       {deleteMessage && (
  <div className="delete-message">
    {deleteMessage}
  </div>
)}

      <div id="wrapper">
      <BotCollection bots={bots} onRender={handleAddToArmy} onDelete={handlePermanentDelete} />
      <YourBotArmy bots={army} onRender={removeFromArmy} onDelete={handlePermanentDelete} />
      
      </div>
    </div>
  );
}

export default App;
