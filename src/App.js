import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AppContext, { AppContextProvider, Async } from './AppContext';

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <AppContextProvider >
          <Switch>
            <Route exact path="/">
              <Async>
                <Home />
              </Async>
            </Route>
            <Route path="/about">
              <Async>
                <About />
              </Async>
            </Route>
            <Route path="/dashboard">
              <Async>
                <Dashboard />
              </Async>
            </Route>
          </Switch>
        </AppContextProvider>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  const ctx = useContext(AppContext)
  return (
    <div>
      <h2>Home</h2>
      <pre>CTX value: {ctx.getRouteData()}</pre>
    </div>
  );
}

function About() {
  const ctx = useContext(AppContext)
  return (
    <div>
      <h2>About</h2>
      <pre>CTX value: {ctx.getRouteData()}</pre>
    </div>
  );
}

function Dashboard() {
  const ctx = useContext(AppContext)
  return (
    <div>
      <h2>Dashboard</h2>
      <pre>CTX value: {ctx.getRouteData()}</pre>
    </div>
  );
}
