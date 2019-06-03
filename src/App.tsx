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
      success: {
        primaryColor: '#0DCB7D',
        secondaryColor: '#10B26C',
        terciaryColor: '#0E995D',
        quaternaryColor: '#88EDC4',
      },
      danger: {
        primaryColor: '#F95E5A',
        secondaryColor: '#CC4C4C',
        terciaryColor: '#A53F3F',
        quaternaryColor: '#FCAEAC',
      },
      neutral: {
        primaryColor: '#365DF0',
        secondaryColor: '#2F55CC',
        terciaryColor: '#244AA8',
        quaternaryColor: '#B9C6FA',
      }
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
