import React from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Web3 from 'web3';

import logo from './flight.jpg';
import './App.css';
import './flightsurety.css';
//import Contract from './contract';
import FlightSuretyApp from './smartcontracts/FlightSuretyApp.json';
import Config from './config.json';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default class App extends React.Component {



  constructor(props) {
    super(props);
    this.state = { owner: '' };
    //this.loadContracts();
    // let contract = new Contract('localhost');
    // let config = Config['localhost'];
    // this.web3 = new Web3(new Web3.providers.HttpProvider(config.url));
    // this.flightSuretyApp = new this.web3.eth.Contract(FlightSuretyApp.abi, config.appAddress);
    // this.accounts = this.web3.eth.getAccounts();
    // this.state = { owner: this.accounts[0], accounts: this.accounts, appContract: this.flightSuretyApp };
    // this.airlines = [];
    // this.passengers = [];
    // this.classes = useStyles();

    //[this.props, this.setValues] = React.useState({
    //  age: '',
    //  name: 'hai',
    //});

    //this.inputLabel = React.useRef(null);
    //const [labelWidth, setLabelWidth] = React.useState(0);
    //React.useEffect(() => {
    //  setLabelWidth(this.inputLabel.current.offsetWidth);
    //}, []);

    this.handleRegisterAirline = this.handleRegisterAirline.bind(this);
    this.handleRegisterPassenger = this.handleRegisterPassenger.bind(this);
    this.handleApprove = this.handleApprove.bind(this);
    this.handleFund = this.handleFund.bind(this);
    this.handleNewFlight = this.handleNewFlight.bind(this);
    this.handleFlightStatus = this.handleFlightStatus.bind(this);
    this.handleBuyInsurance = this.handleBuyInsurance.bind(this);
  }

  componentDidMount() {
    this.loadContracts();
  }

  async loadContracts() {
    //let contract = new Contract('localhost');
    const config = Config['localhost'];
    const web3 = new Web3(new Web3.providers.HttpProvider(config.url));
    const accounts = await web3.eth.getAccounts().catch((e) => { console.log(e); });
    //console.log(accounts);
    const flightSuretyApp = new web3.eth.Contract(FlightSuretyApp.abi, config.appAddress);
    console.log(flightSuretyApp);
    const accountType = await flightSuretyApp.methods.getAccountType(accounts[0]).call({ from: accounts[0] });
    this.setState({ owner: accounts[0] });
    this.setState({ accounts: accounts });
    this.setState({ flightSuretyApp: flightSuretyApp });
    this.setState({ accountType: accountType });
    this.setState({ newName: '' });
    //console.log(this.state);
  }

  async getAccountType() {
    let account = this.owner;
    console.log(account);
    //console.log(self.web3.eth.getBalance(account));
    return await this.state.flightSuretyApp.methods.getAccountType(account).call({ from: account });
  }

  isOperational() {
    let self = this;
    return self.state.flightSuretyApp.methods
      .isOperational()
      .call({ from: self.owner });
  }

  async handleRegisterAirline() {
    const el = document.getElementById('newName');
    console.log('handleRegisterAirline');
    console.log(el.value);
    console.log(this.state.flightSuretyApp);
    await this.state.flightSuretyApp.methods.registerAirline(el.value).call({ from: this.state.owner });
  }

  async handleRegisterPassenger() {
    console.log('handleRegisterPassenger');
  }

  async handleApprove() {
    console.log('handleAPprove');
  };

  handleFund() {
    console.log('handleFund');
  };

  handleNewFlight() {
    console.log('handleNewFlight');
  };

  handleFlightStatus() {
    console.log('handleFlightStatus');
  };

  handleBuyInsurance() {
    console.log('Buy Insurance clicked');
  }

  NoAccount() {
    //this.setState({newName: ''});
    return (
      <div>
        <form autoComplete="off">
          <Grid container direction='column'>
            <Grid item>
              <TextField
                id="newName"
                label="newName"
                margin="normal"
               />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={this.handleRegisterAirline} color="primary">Register Airline</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={this.handleRegisterPassenger} color="primary">Register Passenger</Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }

  Airline() {
    return (

      <div>
        <form autoComplete="off">
          <Grid container direction='column'>
            <Grid item>
              <FormControl>
                <InputLabel htmlFor="airline-list">Waiting for approval</InputLabel>
                <Select
                  value={this.props.airline}
                  onChange={this.handleChange}
                  inputProps={{ name: 'airline', id: 'airline-list', }}>
                  <MenuItem value={10}>JAL</MenuItem>
                  <MenuItem value={20}>ANA</MenuItem>
                  <MenuItem value={30}>AA</MenuItem>
                </Select>
                <Button variant="contained" onClick={this.handleApprove} color="primary">Approve</Button>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel htmlFor="fund-amount">Fund</InputLabel>
                <Input
                  id="fund-amount"
                  value={this.props.fundAmount}
                  aria-describedby="fund-amount-text"
                />
                <FormHelperText id="fund-amount-text">Fund more than 1 ether</FormHelperText>
                <Button variant="contained" onClick={this.handleFund} color="primary">Fund</Button>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel htmlFor="new-flight">Register Flight</InputLabel>
                <Input
                  id="new-flight"
                  value={this.props.newFlight}
                  aria-describedby="new-flight-text"
                />
                <FormHelperText id="new-flight-text">Register flight</FormHelperText>
                <Button variant="contained" onClick={this.handleNewFlight} color="primary">Register</Button>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <TextField
                  id="flight-status"
                  label="Flight Status"
                  value={this.props.approvalStatus}
                  margin="normal"
                />
                <InputLabel htmlFor="flight-status">Flight Status</InputLabel>
                <Select
                  value={this.props.flight}
                  inputProps={{ name: 'flight', id: 'flight-list', }}>
                  <MenuItem value={10}>001</MenuItem>
                  <MenuItem value={20}>002</MenuItem>
                  <MenuItem value={30}>003</MenuItem>
                </Select>
                <Select
                  value={this.props.status}
                  inputProps={{ name: 'status', id: 'status-list', }}>
                  <MenuItem value={0}>UNKNOWN</MenuItem>
                  <MenuItem value={10}>ON TIME</MenuItem>
                  <MenuItem value={20}>LATE AIRLINE</MenuItem>
                  <MenuItem value={30}>LATE WEATHER</MenuItem>
                  <MenuItem value={40}>LATE TECHNICAL</MenuItem>
                  <MenuItem value={50}>LATE OTHER</MenuItem>
                </Select>
                <Button variant="contained" onClick={this.handleFlightStatus} color="primary">Flight Status Update</Button>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }

  Passenger() {
    return (

      <div>
        <form autoComplete="off">
          <Grid continer direction='column'>
            <Grid item>
              <Grid container direction='row' alignItems='stretch'>
                <Grid item>
                  <FormControl>
                    <InputLabel htmlFor="airline-list">Airline</InputLabel>
                    <Select
                      width={1 / 5}
                      value={this.props.airline}
                      inputProps={{ name: 'airline', id: 'airline-list', }}>
                      <MenuItem value={10}>JAL</MenuItem>
                      <MenuItem value={20}>ANA</MenuItem>
                      <MenuItem value={30}>AA</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl>
                    <InputLabel htmlFor="flight-list">Flight</InputLabel>
                    <Select
                      width={1 / 5}
                      value={this.props.flight}
                      inputProps={{ name: 'flight', id: 'flight-list', }}>
                      <MenuItem value={10}>001</MenuItem>
                      <MenuItem value={20}>002</MenuItem>
                      <MenuItem value={30}>003</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <TextField
                    width={1 / 5}
                    id="flight-status"
                    label="Flight Status"
                    value={this.props.flightStatus}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel htmlFor="component-insuranceAmount">Insurance Amount</InputLabel>
                <Input
                  width={1 / 5}
                  id="component-insuranceAmount"
                  value={this.props.insuranceAmount}
                  aria-describedby="component-helper-text"
                />
                <FormHelperText id="component-helper-text">Input Insurance Amount</FormHelperText>
              </FormControl>

              <Button
                width={1 / 5}
                variant="contained"
                color="primary"
                onClick={this.handleBuyInsurance}>
                Buy Insurance
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    )
  }

  render() {
    //console.log(this.getAccountType());
    return (
      // const accountType = this.flightSuretyApp.methods.getAccountType.call(this.owner, {from: this.owner});
      <div className="App">
        <header className="App-header">
          <h1>Flight Surety DApp</h1>
          <p>Account : {this.state.owner}</p>
          <p>Account Type : {this.state.accountType}</p>
          <img src={logo} className="App-logo" alt="logo" />
          {
            (() => {
              console.log(this.state.accountType);
              if (10 == this.state.accountType) {
                return (this.Airline());
              } else if (20 == this.state.accountType) {
                return (this.Passenger());
              } else if (0 == this.state.accountType) {
                return (this.NoAccount());
              }
            })()
          }
        </header>
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//       </header>
//     </div>
//   );
// }

// export default App;
