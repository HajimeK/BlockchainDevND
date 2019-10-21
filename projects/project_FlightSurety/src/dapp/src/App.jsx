import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import {
  DrizzleProvider,
  DrizzleContext
} from "drizzle-react";
import AccountContainer from "./Account/AccountContainer";
import { LoadingContainer } from "drizzle-react-components";

//import FlightSurety from "./FlightSurety"
import Account from "./Account/Account"
import Airline from "./Airline"
import Passenger from "./Passenger"

import store from './middleware';
import drizzleOptions from "./drizzleOptions";


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
            <DrizzleProvider store={store} options={drizzleOptions}>
              <LoadingContainer>
                <DrizzleContext.Provider drizzle={this.props.drizzle} >
                  <AccountContainer />
                </DrizzleContext.Provider>
              </LoadingContainer>
            </DrizzleProvider>
            <Airline
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
            />
            <Passenger
              drizzle={this.props.drizzle}
              drizzleState={this.state.drizzleState}
            />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
