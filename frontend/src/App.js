//gbj3 4/22 it302-002 phase5 gbj3@njit.edu
import './App.css';
import React, { useState, useCallback } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import ActivityList from "./components/activityList";
import Activity from "./components/activity";
import Login from "./components/login";
import AddFeedback from "./components/addFeedback";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function App() {
  const [user, setUser] = useState(null);

  const loginSetter = useCallback(user => {
    setUser(user);
  }, [setUser]);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }
  return (
   <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Activity Feedback</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link as={NavLink} to={"/gbj3_activities"}>Activities</Nav.Link>
            <Nav.Link as={NavLink} to={user ? "" : "/login"}>
                  {user ? "Logout User" : "Login"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path="/" element={<ActivityList />}></Route>

        <Route path="/gbj3_activities" element={<ActivityList />}></Route>

        <Route path="/gbj3_activities/:id" element={<Activity user={user} />}></Route>

        <Route
          path="/gbj3_activities/:id/feedback"
          element={<AddFeedback user={user} />}
      ></Route>

        <Route path="/login" element={<Login user={user} loginSetter={loginSetter} />}></Route>
      </Routes>

    </div>
  );
}

export default App;
