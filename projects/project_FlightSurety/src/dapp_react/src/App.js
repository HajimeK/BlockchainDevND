import React from 'react';
import logo from './flight.jpg';
import './App.css';
import './flightsurety.css';
import Contract from './contract';
import FlightSuretyApp from './smartcontracts/FlightSuretyApp';
import Config from './config.json';
import Web3 from 'web3';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';

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
    //let contract = new Contract('localhost');
    let config = Config['localhost'];
    this.web3 = new Web3(new Web3.providers.HttpProvider(config.url));
    this.web3.eth.getAccounts((error, accts) => {
      this.owner = accts[0];
    })
    this.flightSuretyApp = new this.web3.eth.Contract(FlightSuretyApp.abi, config.appAddress);
    this.airlines = [];
    this.passengers = [];
    //this.classes = useStyles();

    //[this.props, this.setValues] = React.useState({
    //  age: '',
    //  name: 'hai',
    //});

    //this.inputLabel = React.useRef(null);
    //const [labelWidth, setLabelWidth] = React.useState(0);
    //React.useEffect(() => {
    //  setLabelWidth(this.inputLabel.current.offsetWidth);
    //}, []);
    this.handleApprove = this.handleApprove.bind(this);
    this.handleFund = this.handleFund.bind(this);
    this.handleNewFlight = this.handleNewFlight.bind(this);
    this.handleFlightStatus = this.handleFlightStatus.bind(this);
    this.handleBuyInsurance = this.handleBuyInsurance.bind(this);
  }

  getAccountType() {
    let self = this;
    let account = this.web3.eth.accounts[0];
    return self.flightSuretyApp.methods
      .getAccountType()
      .call({ from: account });
  }

  isOperational() {
    let self = this;
    return self.flightSuretyApp.methods
      .isOperational()
      .call({ from: self.owner });
  }

  handleApprove() {
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

  Airline() {
    return (

      <div>
        <form autoComplete="off">
          <TextField
            id="flight-status"
            label="Flight Status"
            value={this.props.approvalStatus}
            margin="normal"
          />
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
          <FormControl>
            <InputLabel htmlFor="new-flight">Register Flight</InputLabel>
            <Input
              id="new-flight"
              value={this.props.newFlight}
              aria-describedby="new-flight-text"
            />
            <FormHelperText id="new-flight-text">Register flight</FormHelperText>
            <Button variant="contained" onClick={this.handleNewFlight} color="primary">Fund</Button>
          </FormControl>
          <FormControl>
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
        </form>
      </div>
    );
  }

  Passenger() {
    console.log(this.getAccountType())
    return (

      <div>
        <form autoComplete="off">
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

          <TextField
            width={1 / 5}
            id="flight-status"
            label="Flight Status"
            value={this.props.flightStatus}
            margin="normal"
          />
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
        </form>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {this.isOperational() ? this.Airline() : this.Passenger()}
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
