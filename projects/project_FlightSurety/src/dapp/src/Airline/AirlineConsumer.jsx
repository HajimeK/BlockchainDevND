import React from "react";
import { DrizzleContext } from "drizzle-react";

import Airline from './Airline';

export default () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;
  
      if (!initialized) {
        return "Loading...";
      }

      return (
        <Airline drizzle={drizzle} drizzleState={drizzleState} />
      );
    }}
  </DrizzleContext.Consumer>
)