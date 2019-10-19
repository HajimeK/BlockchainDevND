import React from "react";

class FlightSurety extends React.Component {
  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    console.log(drizzle);
    console.log(drizzleState);
    const contract = drizzle.contracts.FlightSuretyApp;

    // let drizzle know we want to watch the `myString` method
    //const operational = contract.methods["isOperational"].cacheCall();

    // save the `dataKey` to local component state for later reference
    //this.setState({ operational });
  }

  render() {
    return <div>hello</div>;
  }
}

export default FlightSurety;