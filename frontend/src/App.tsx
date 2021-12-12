import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import {Header} from "./components/header/Header";
import {Authentication} from "./components/authentication/Authentication";
import {Button} from "@mui/material";
import authenticationStore from "./store/authentication";
import notesService from "./services/notes"
import {Registration} from "./components/authentication/Registration";
import {Notes} from "./views/notes/Notes";

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Header/>
        </header>
        <Routes>
          <Route path="/about" element={<div>ABOUT</div>}/>
          <Route path="/users" element={<Notes/>}/>
          <Route path="/" element={<div>HOME</div>}/>
          <Route path="/*" element={<Navigate to="/" />}/>
        </Routes>
      </Router>
      <Button onClick={() => {authenticationStore.authModal = true}}>Open</Button>
      <Button onClick={() => {notesService.get()}}>Notes</Button>
      <Authentication/>
      <Registration/>
    </div>
  );
}

export default App;