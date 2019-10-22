import React from "react";
import { DrizzleContext } from "drizzle-react";

import Passenger from './Passenger';

export default () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;
  
      if (!initialized) {
        return "Loading...";
      }

      return (
        <Passenger drizzle={drizzle} drizzleState={drizzleState} />
      );
    }}
  </DrizzleContext.Consumer>
)