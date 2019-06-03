import React from 'react';
import './App.scss';
import { HomePage } from './pages/home'
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider } from 'styled-components';

class App extends React.Component {

  render() {
    const theme = {
      bossaFontFamily: 'Roboto',
      primaryFontColor: '#000',
      primarySuccessColor: '#0DCB7D',
      secondarySuccessColor: '#10B26C',
      terciarySuccessColor: '#0E995D',
      quaternarySuccessColor: '#88EDC4',
      primaryDangerColor: '#F95E5A',
      secondaryDangerColor: '#CC4C4C',
      terciaryDangerColor: '#A53F3F',
      quaternaryDangerColor: '#FCAEAC',
      primaryNeutralColor: '#365DF0',
      secondaryNeutralColor: '#2F55CC',
      terciaryNeutralColor: '#244AA8',
      quaternaryNeutralColor: '#B9C6FA',
    }

    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={HomePage} />
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
