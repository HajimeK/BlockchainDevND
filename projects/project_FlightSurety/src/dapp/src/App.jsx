import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import {
  DrizzleProvider,
  DrizzleContext
} from "drizzle-react";
import AccountContainer from './Account/AccountContainer';
import AirlineContainer from './Airline/AirlineContainer';
import PassengerContainer from './Passenger/PassengerContainer';
import { LoadingContainer } from "drizzle-react-components";

import store from './middleware';
import drizzleOptions from "./drizzleOptions";

import {
  Typography,
  Paper,
} from '@material-ui/core'

class App extends Component {
  state = { loading: true, drizzleState: null };

  componentDidMount() {
    const { drizzle } = this.props;
    console.log(this.props);

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {
      this.setState(drizzle);
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) return ("Loading Drizzle...");
    //console.log(this.props);
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <div className="App">
            <Paper>
              <Typography component="p">
                You have to refresh the screen after you've changed your account as MetaMask account switch logic is not yet incorporated. Sorry for the inconvenience.
              </Typography>
            </Paper>
            <DrizzleProvider store={store} options={drizzleOptions}>
              <LoadingContainer>
                <DrizzleContext.Provider store={store} drizzle={this.props.drizzle} >
                <AccountContainer />
                <AirlineContainer />
                <PassengerContainer />
                </DrizzleContext.Provider>
              </LoadingContainer>
            </DrizzleProvider>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
