import FlightSuretyApp from "./smartcontracts/FlightSuretyApp.json";

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:8545",
    },
  },
  contracts: [FlightSuretyApp],
  events: {
    FlightSuretyApp: ["eventGetAccountType"],
  },
  polls: {
    // set polling interval to 30secs so we don't get buried in poll events
    accounts: 30000,
  },
};

export default options;
