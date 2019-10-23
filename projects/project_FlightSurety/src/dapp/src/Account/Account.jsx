import React from "react";
import {
    DrizzleContext
} from 'drizzle-react';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
    ContractForm,
} from "drizzle-react-components";

import {
    Button,
    Grid,
    TextField,
    Typography,
    Paper,
} from '@material-ui/core'


class Account extends React.Component {
    constructor(props) {
        super(props)
        //console.log(props);
    }

    componentDidMount() {
        const { drizzleStatus, FlightSuretyApp, accounts } = this.props;
        console.log(this.props);
        // console.log(drizzle);
        // console.log(drizzleState);
        // const contract = drizzle.contracts.FlightSuretyApp;
        // var state = drizzle.store.getState()
        // contract.methods.getAccountType.cacheSend(
        //     state.accounts[0],
        //     {
        //         from: state.accounts[0],
        //         gas: 4712388,
        //         gasPrice: 100000000000
        //     }, (error, result) => {
        //         console.log(result);
        //     });

        // let drizzle know we want to watch the `myString` method
        //const operational = contract.methods.registerAirline.cacheCall();

    }

    handleRegisterAirline = e => {
        console.log('handleRegisterAirline');
        const new_name = document.getElementById('newName');
        const accountToRegister = document.getElementById('accountToRegister');
        console.log(accountToRegister.value);
        //console.log(string(accountToRegister));

        const { drizzle } = this.props;
        const { drizzleStatus, accounts } = this.props.drizzleState;

        if (drizzleStatus.initialized) {
            drizzle.contracts.FlightSuretyApp.methods.registerAirline(
                new_name.value,
                accountToRegister.value,
                accounts[0]).send({
                    from: accounts[0],
                    gas: 4712388,
                    gasPrice: 100000000000
                });
            // console.log(state.transactionStack[stackId]);
            // if (state.transactionStack[stackId]) {
            //     const txHash = state.transactionStack[stackId]
            //     console.log(state);
            // }

            drizzle.contracts.FlightSuretyApp.methods.getAccountType(accounts[0])
                .send({
                    from: accounts[0],
                    gas: 4712388,
                    gasPrice: 100000000000
                });
        }
    };

    handleRegisterPassenger = e => {
        console.log('handleRegisterPassenger');
        const new_name = document.getElementById('newName');
        // console.log(el.value);
        // console.log(this);

        const { drizzle } = this.props;
        const { drizzleStatus, accounts } = this.props.drizzleState;

        if (drizzleStatus.initialized) {
            drizzle.contracts.FlightSuretyApp.methods.registerPassenger(new_name.value).send({
                from: accounts[0],
                gas: 4712388,
                gasPrice: 100000000000
            });

            drizzle.contracts.FlightSuretyApp.methods.getAccountType(accounts[0])
                .send({
                    from: accounts[0],
                    gas: 4712388,
                    gasPrice: 100000000000
                });
        }
    };

    render() {
        const { drizzle, drizzleStatus, accounts } = this.props;
        //console.log(drizzle);
        return (
            <div className="App" style={{ textAlign: 'center', margin: '50px auto' }}>
                <Paper>
                    <ToastContainer />
                    <div className="section">
                        {/* <ContractForm
                            contract="FlightSuretyApp"
                            method="registerAirline"
                            sendArgs={[
                                { from: accounts[0] },
                                { gas: 4712388 },
                                { gasPrice: 100000000000 }]} /> */}

                        <Typography variant="subtitle1" gutterBottom>
                            Account:
                            </Typography>
                        <form autoComplete="off">
                            <Grid container direction='row'>
                                <Grid item>
                                    <TextField
                                        id="newName"
                                        label="newName"
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="accountToRegister"
                                        label="Account Registered"
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
                    <Typography component="p">
                        The account "0" in truffle is automaticalle reigstered as the name 'default' airline.
                    </Typography>
                    <Typography component="p"> 
                        For 2nd, 3rd, and 4th arilines, only already registered and funded can register.
                    </Typography>
                    <Typography component="p"> 
                        So for the test purposes, you'd better work with your 'default' account to resiter 2nd, 3rd, and 4th arilines.
                    </Typography>
                    <Typography component="p"> 
                        You need the airlines to be funded and approved to register flight and update status.
                    </Typography>
                    <Typography component="p"> 
                        Airline Status transition : Unregistered -> Registered -> Approved -> Funded
                    </Typography>
                    <Typography component="p"> 
                        For passengers, they are self regiser accounts.
                    </Typography>
                    <Typography component="p"> 
                        Under a passenger account to be registered, put an account name, and press "Register Passenger".
                    </Typography>
                    <Typography component="p"> 
                        For passengers, account address is ignored.
                    </Typography>
                </Paper >
            </div >
        );
    }
}

export default Account;