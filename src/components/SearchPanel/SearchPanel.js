import React from 'react';
import { Input } from 'antd';

import './SearchPanel.css';

const searchValue = (e, queryValue) => {
  queryValue(e);
};

const debounce = (fn, debounceTime) => {
  let time;
  return function times(...args) {
    clearTimeout(time);
    time = setTimeout(() => {
      fn.apply(this, args);
    }, debounceTime);
  };
};

const debouncedFn = debounce(searchValue, 800);

function SearchPanel({ queryValue }) {
  return <Input className="SearchPanel" placeholder="Type to search..." onChange={(e) => debouncedFn(e, queryValue)} />;
}

export default SearchPanel;
