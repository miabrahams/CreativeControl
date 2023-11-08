import React from 'react';
// import { Switch, Route } from 'react-router-dom';
import UserHeader from './UserHeader';
import ProjectContainer from './ProjectContainer';

let gameStore = [];

function App(props) {
  return (
    <div className="router">
      <UserHeader/>
      <ProjectContainer/>
    </div>
  )
}

export default App;
