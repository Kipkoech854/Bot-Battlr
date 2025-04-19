import React, { useState } from 'react';
import './App.css';

function Sort({ sort, restore }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    if (isOpen) {
      restore(); 
      setIsOpen(false); 
    } else {
      setIsOpen(true); 
    }
  };

  const handleSortClick = (category, direction) => {
    sort(category, direction);
    setIsOpen(false);
  };

  return (
    <div className="sort-container">
      <button className="sort-button" onClick={toggleMenu}>
        {isOpen ? 'Restore Order' : 'Sort'}
      </button>
      {isOpen && (
        <div className="sort-menu">
          {['health', 'damage', 'armor'].map(category => (
            <div key={category} className="sort-option">
              <span>{category}</span>
              <div className="sort-submenu">
                <div onClick={() => handleSortClick(category, 'asc')}>Ascend</div>
                <div onClick={() => handleSortClick(category, 'desc')}>Descend</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Sort;
