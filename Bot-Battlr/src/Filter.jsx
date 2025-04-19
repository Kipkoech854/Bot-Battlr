import React, { useState } from 'react';
import './App.css'; 

function Filter({ bots, onFilter }) {
  const [showMenu, setShowMenu] = useState(false);

  function getUniqueClassTypes(bots) {
    const classTypes = bots.map(bot => bot.bot_class); 
    return [...new Set(classTypes)];
  }

  const uniqueClasses = getUniqueClassTypes(bots);

  return (
    <div
      className="filter-container"
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <button className="filter-button">Filter</button>
      {showMenu && (
        <div className="filter-menu">
          {uniqueClasses.map((classType, index) => (
            <div
              key={index}
              className="filter-option"
              onClick={() => onFilter(classType)}
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
