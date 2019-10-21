import React from "react";
import { DrizzleContext } from "drizzle-react";

import Account from './Account';

export default () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;
  
      if (!initialized) {
        return "Loading...";
      }

      return (
        <Account drizzle={drizzle} drizzleState={drizzleState} />
      );
    }}
  </DrizzleContext.Consumer>
)