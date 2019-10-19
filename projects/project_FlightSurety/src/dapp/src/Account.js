import React from "react";

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



class Account extends React.Component {

    componentDidMount() {
        const { drizzle, drizzleState } = this.props;
        console.log(drizzle);
        console.log(drizzleState);
        const contract = drizzle.contracts.FlightSuretyApp;
        var state = drizzle.store.getState()
        contract.methods.getAccountType.cacheSend(
            state.accounts[0],
            {
                from: state.accounts[0],
                gas: 4712388,
                gasPrice: 100000000000
            }, (error, result) => {
                console.log(result);
            });

        // let drizzle know we want to watch the `myString` method
        //const operational = contract.methods.registerAirline.cacheCall();

    }

    handleRegisterAirline = e => {
        console.log('handleRegisterAirline');
        const el = document.getElementById('newName');
        console.log(el.value);

        const { drizzle, drizzleState } = this.props;
        var state = drizzle.store.getState()
        console.log(state);
        if (state.drizzleStatus.initialized) {
            //const stackId = drizzle.contracts.FlightSuretyApp.methods.registerAirline(el.value).send({
            drizzle.contracts.FlightSuretyApp.methods.registerAirline(el.value).send({
                from: state.accounts[0],
                gas: 4712388,
                gasPrice: 100000000000
            });
            // console.log(state.transactionStack[stackId]);
            // if (state.transactionStack[stackId]) {
            //     const txHash = state.transactionStack[stackId]
            //     console.log(state);
            // }

            drizzle.contracts.FlightSuretyApp.methods.getAccountType(state.accounts[0]).call();
                // .send({
                //     from: state.accounts[0],
                //     gas: 4712388,
                //     gasPrice: 100000000000
                // });
        }
    };

    handleRegisterPassenger = e => {
        console.log('handleRegisterPassenger');
    };

    render() {
        return (
            <div style={{ textAlign: 'center', margin: '50px auto' }}>
                <Paper>
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
                </Paper >
            </div >
        );
    }
}

export default Account;