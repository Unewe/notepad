import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Header } from './components/header/Header';
import { Authentication } from './components/authentication/Authentication';
import { Registration } from './components/authentication/Registration';
import { Notes } from './views/notes/Notes';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <header className='App-header'>
          <Header />
        </header>
        <Routes>
          <Route path='/web/about' element={<div>ABOUT</div>} />
          <Route path='/web/notes' element={<Notes />} />
          <Route path='/web/' element={<div>HOME</div>} />
          <Route path='/web/*' element={<Navigate to='/web' />} />
        </Routes>
      </Router>
      <Authentication />
      <Registration />
    </div>
  );
}

export default App;
