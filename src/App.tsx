import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
// import './App.css';
import * as containers from './containers'
import pages from './pages'

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div>
      <ThemeProvider theme={theme}>
        <Switch>
          <Redirect exact path="/"
            to = {pages.palette.href}
          />
          <Route exact path={pages.counter.href}
            component={containers.Counter}
          />
          <Route exact path={pages.counterHook.href}
            component={containers.CounterHook}
          />
          <Route exact path={pages.counter.href}
            component={containers.Counter}
          />
          <Route exact path={pages.palette.href}
            component={containers.Palette}
          />
          <Route exact path={pages.notFound.href}
            component={containers.NotFound}
          />
          <Redirect to={pages.notFound.href} />
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
