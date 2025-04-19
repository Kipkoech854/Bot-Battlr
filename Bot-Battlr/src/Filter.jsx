import React, { useState } from 'react';
import './App.css';

function Filter({ bots, onFilter, activeFilter }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const getUniqueClassTypes = (bots) => {
    const classTypes = bots.map(bot => bot.bot_class);
    return [...new Set(classTypes)];
  };

  const uniqueClasses = getUniqueClassTypes(bots);

  const handleFilterClick = (classType) => {
    onFilter(classType);
    if (activeFilter === classType) {
      setMenuVisible(false); // Hide only if filter is cleared
    } else {
      setMenuVisible(true); // Keep showing when applying filter
    }
  };

  return (
    <div className="filter-container" onMouseEnter={() => setMenuVisible(true)} onMouseLeave={() => {
      if (!activeFilter) setMenuVisible(false);
    }}>
      <button className="filter-button">Filter</button>
      {menuVisible && (
        <div className="filter-menu">
          {uniqueClasses.map((classType, index) => (
            <div
              key={index}
              className={`filter-option ${activeFilter === classType ? 'active' : ''}`}
              onClick={() => handleFilterClick(classType)}
            >
              {classType}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Filter;
