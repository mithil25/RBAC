import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Upload from "./Upload";
import Home from "./Home";
import FileViewer from "./FileViewer";
import Roles from "./Roles";

function App() {
  function handleLogout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("email");
    window.location.reload(true);
  }

  return (
    <Router>
      <div>
        <nav className="bg-white h-20 flex items-center">
          <Link to="/" className="text-4xl px-16">
            RBAC
          </Link>
          <ul className="flex space-x-6 pr-6 text-lg justify-end w-full">
            {!localStorage.getItem("loggedIn") && (
              <>
                <li className="">
                  <Link to="/register">Register</Link>
                </li>
                <li className="">
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
            {localStorage.getItem("loggedIn") && (
              <>
                <li className="">
                  <Link to="/roles">Roles</Link>
                </li>
                <li className="">
                  <Link to="/view">View</Link>
                </li>
                <li className="">
                  <Link to="/upload">Upload</Link>
                </li>
                <li className="">
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </nav>
        <hr />
        <Switch>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/upload">
            <Upload />
          </Route>
          <Route exact path="/view">
            <FileViewer />
          </Route>
          <Route exact path="/roles">
            <Roles />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
