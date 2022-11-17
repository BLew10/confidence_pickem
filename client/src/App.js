import React from 'react';
import { Routes, Route } from 'react-router-dom'

import Home from './views/Home';
import Dashboard from './views/Dashboard';
import CreateLeague from './views/CreateLeague';
import LeagueDisplay from './views/LeagueDisplay';
import JoinLeague from './views/JoinLeague';
import EditLeague from './views/EditLeague';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Home />} path="/" />

        <Route element={<Dashboard />} path="/users/home" />
        <Route element={<LeagueDisplay />} path="/leagues/:id" />

        <Route element={<CreateLeague />} path="/leagues/create" />


        <Route element={<EditLeague />} path="/leagues/:id/edit" />
        <Route element={<JoinLeague />} path="/leagues" />

      </Routes>
    </div>
  );
}
export default App;

