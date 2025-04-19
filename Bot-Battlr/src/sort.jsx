import React from 'react';
import './App.css';

function Sort({ onSort }) {
  return (
    <div className="sort-container">
      <button className="sort-button">Sort</button>
      <div className="sort-menu">
        {['health', 'damage', 'armor'].map((category) => (
          <div key={category} className="sort-option">
            {category}
            <div className="sort-submenu">
              <div onClick={() => onSort(category, 'asc')}>Ascend</div>
              <div onClick={() => onSort(category, 'desc')}>Descend</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sort;
