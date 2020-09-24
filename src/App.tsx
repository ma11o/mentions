import React from 'react';
import StockList from './components/StockList';

const { api } = window;

function App() {
  return (
    <StockList api={api}/>
  );
}

export default App;
