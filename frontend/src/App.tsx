import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {Header} from "./components/header/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Header/>
        </header>
        <Routes>
          <Route path="/about" element={<div>ABOUT</div>}/>
          <Route path="/users" element={<div>USERS</div>}/>
          <Route path="/" element={<div>HOME</div>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;