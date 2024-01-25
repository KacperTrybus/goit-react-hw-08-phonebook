import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filterSlice';
import { selectFilter } from '../../redux/selectors';

import './filter.css';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleFilterChange = e => {
    const filterValue = e.target.value;
    dispatch(setFilter(filterValue));
  };

  return (
    <div className="filter-box">
      <label htmlFor="filterInput" className="filter-label">
        Find contacts by name:
        <input
          id="filterInput"
          type="text"
          value={filter}
          onChange={handleFilterChange}
          className="filter-input"
        />
      </label>
    </div>
  );
};

export default Filter;
