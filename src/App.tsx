import React from 'react';
import './App.scss';

import AuthRoute from "./utils";
import { HomePage } from './pages/home'
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider } from 'styled-components';

class App extends React.Component {

  render() {
    const theme = {
      bossaFontFamily: "Ubuntu",
      bossaFontColor: '#170C3A',
      primaryColor: '#0E995D',
      secondaryColor: '#10B26C',
      terciaryColor: '#12DB89',
      quaternaryColor: '#88EDC4',
      fifthenaryColor: '#E7FBF3',
    }

    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            {/* <Route exact path="/" redirectTo="/login" /> */}
            {/* <Route exact path="/login" component={LoginPage} /> */}
            <AuthRoute redirectTo="/home" path="/" component={HomePage} />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
