import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import { DrizzleProvider } from "drizzle-react";
import { LoadingContainer } from "drizzle-react-components";

//import FlightSurety from "./FlightSurety"
import Account from "./Account"
import Airline from "./Airline"
import Passenger from "./Passenger"

import drizzleOptions from "./drizzleOptions";
import store from './middleware'

class App extends Component {
  state = { loading: true, drizzleState: null };

  componentDidMount() {
    const { drizzle } = this.props;

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {

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
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <div className="App">
            <DrizzleProvider store={store} options={drizzleOptions}>
              <LoadingContainer>
                <Account
                  drizzle={this.props.drizzle}
                  drizzleState={this.state.drizzleState}
                />
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
