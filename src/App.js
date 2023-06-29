import React from 'react';
import PlanetsProvider from './context/PlanetsProvider';
import Main from './components/Main';
import './index.css';

function App() {
  return (
    <PlanetsProvider>
      <Main />
    </PlanetsProvider>
  );
}

export default App;
