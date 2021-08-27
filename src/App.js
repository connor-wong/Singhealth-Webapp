import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./components/users-dev/Auth";
import PrivateRoute from "./components/users-dev/PrivateRoute";
import Login from "./components/users-dev/Login";
import SignUp from "./components/users-dev/SignUp";
import Home from "./components/users-dev/Home";
import RetailSelection from "./components/selections-dev/RetailTenantSelection";
//import InstitutionSelection from "./components/selections-dev/InstitutionSelection";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/selection" component={RetailSelection} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
