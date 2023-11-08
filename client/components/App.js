import React from 'react';
// import { Switch, Route } from 'react-router-dom';
import UserHeader from './UserHeader';
import ProjectContainer from './ProjectContainer';
import TitleBar from './TitleBar'

let gameStore = [];

function App(props) {
  return (
    <div className="router">
      <TitleBar/>
      <UserHeader/>
      <ProjectContainer/>
    </div>
  )
}

export default App;
