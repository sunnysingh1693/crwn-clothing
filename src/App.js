import React from 'react';
import { Route } from 'react-router';
import './App.css';
import HomePage from './pages/homepage/homepage.component';

const HatsPage = () => (
  <h1>Hats</h1>
);

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={HomePage} />
      <Route exact path='/hats' component={HatsPage} />
    </div>
  );
}

export default App;
