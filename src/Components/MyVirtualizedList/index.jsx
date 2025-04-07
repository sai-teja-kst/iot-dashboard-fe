import React from 'react';
import { List } from 'react-virtualized';
import 'react-virtualized/styles.css';

const list = Array(5000000).fill().map((_, index) => ({
  id: index,
  name: `Item ${index}`
}));

function rowRenderer({ index, key, style }) {
  return (
    <div key={key} style={style}>
      {list[index].name}
    </div>
  );
}

function MyVirtualizedList() {
  return (
    <div className="vh-100">
    <List
      width={900}
      height={800}
      rowCount={list.length}
      rowHeight={30}
      rowRenderer={rowRenderer}
    />
    </div>
  );
}

export default MyVirtualizedList;