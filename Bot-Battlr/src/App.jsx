import React, { useEffect, useState } from 'react';
import BotCollection from './BotCollection';
import YourBotArmy from './YourBotArmy';
import Header from './Header';
import Sort from './Sort';
import Filter from './Filter';
import './App.css';

function App() {
  const [bots, setBots] = useState([]);
  const [originalBots, setOriginalBots] = useState([]);
  const [army, setArmy] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [filterMessage, setFilterMessage] = useState('');
  const [sortMessage, setSortMessage] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/bots')
      .then(res => res.json())
      .then(data => {
        setBots(data);
        setOriginalBots(data);
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  function handleAddToArmy(bot) {
    const alreadyInClass = army.find(b => b.bot_class === bot.bot_class);
    if (alreadyInClass) {
      setSortMessage(`A "${bot.bot_class}" class bot is already in the army.`);
      setTimeout(() => setSortMessage(''), 3000);
      return;
    }

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
        setTimeout(() => setDeleteMessage(''), 3000);
      })
      .catch(err => console.error('Delete failed:', err));
  }

  function handleSort(category, direction) {
    const sorted = [...bots].sort((a, b) => {
      const valA = parseFloat(a[category]) || 0;
      const valB = parseFloat(b[category]) || 0;
      return direction === 'asc' ? valA - valB : valB - valA;
    });

    setBots(sorted);

    const capitalized = category.charAt(0).toUpperCase() + category.slice(1);
    const directionText = direction === 'asc' ? 'ascending' : 'descending';
    setSortMessage(`Sorted ${capitalized} in ${directionText} order. Click again to restore`);

    setTimeout(() => setSortMessage(''), 3000);
  }

  function restoreOriginalOrder() {
    setBots(originalBots);
    setSortMessage('Restored to original order');
    setTimeout(() => setSortMessage(''), 3000);
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
      <Sort sort={handleSort} restore={restoreOriginalOrder} />
      <Filter bots={originalBots} onFilter={handleFilter} activeFilter={activeFilter} />
      {filterMessage && <div className="filter-message">{filterMessage}</div>}
      {deleteMessage && <div className="delete-message">{deleteMessage}</div>}
      {sortMessage && <p className="sort-message">{sortMessage}</p>}
      <div id="wrapper">
        <BotCollection bots={bots} onRender={handleAddToArmy} onDelete={handlePermanentDelete} />
        <YourBotArmy bots={army} onRender={removeFromArmy} onDelete={handlePermanentDelete} />
      </div>
    </div>
  );
}

export default App;
