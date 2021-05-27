import React from 'react';
import './App.css';
import Navigation from "./components/navigation";
import Register from "./components/Register"
import {Link, Route} from "react-router-dom"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"

export default function App() {
  return (
    <>
      <div className="mainBody">
        <Navigation/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/dashboard" component={Dashboard}/>
      </div>
    </>
  );
}
