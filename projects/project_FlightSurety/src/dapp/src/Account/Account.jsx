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
        const el = document.getElementById('newName');
        // console.log(el.value);
        // console.log(this);

        const { drizzle } = this.props;
        const { drizzleStatus, accounts } = this.props.drizzleState;

        if (drizzleStatus.initialized) {
            drizzle.contracts.FlightSuretyApp.methods.registerAirline(el.value).send({
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
        const el = document.getElementById('newName');
        // console.log(el.value);
        // console.log(this);

        const { drizzle } = this.props;
        const { drizzleStatus, accounts } = this.props.drizzleState;

        if (drizzleStatus.initialized) {
            drizzle.contracts.FlightSuretyApp.methods.registerPassenger(el.value).send({
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
                                        <Button variant="contained" onClick={this.handleRegisterAirline} color="primary">Register Airline</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" onClick={this.handleRegisterPassenger} color="primary">Register Passenger</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </Paper >
            </div >
        );
    }
}

export default Account;