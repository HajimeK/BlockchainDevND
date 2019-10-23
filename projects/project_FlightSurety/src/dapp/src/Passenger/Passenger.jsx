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



class Passenger extends React.Component {

    handleBuyInsurance = e => {
        console.log('handleInsurance');
        const { drizzle } = this.props;
        const { drizzleStatus, accounts } = this.props.drizzleState;

        const airlineBuy = document.getElementById("airline-buy");
        const flightBuy = document.getElementById("flight-buy");
        const passengerBuy = document.getElementById("passenger-buy");
        const flightBuyTimestamp = document.getElementById("flight-buy-timestamp");
        console.log(flightBuyTimestamp.value);
        const timestamp = new Date(2019, 12, 31, 1, 1, 1).getTime();

        const flightInsuranceAmount = document.getElementById("flight-insurance-amount");


        if (drizzleStatus.initialized) {
            //const stackId = drizzle.contracts.FlightSuretyApp.methods.registerAirline(el.value).send({
            drizzle.contracts.FlightSuretyApp.methods.buy(
                airlineBuy.value,
                flightBuy.value,
                timestamp,
                passengerBuy.value)
            .send({
                from: accounts[0],
                value: Number(flightInsuranceAmount.value),
                gas: 4712388,
                gasPrice: 100000000000
            });
        }
    };

    handleWithdraw = e => {
        console.log('handleWithdraw');
        const { drizzle } = this.props;
        const { drizzleStatus, accounts } = this.props.drizzleState;
        const el = document.getElementById('withdraw-amount');

        if (drizzleStatus.initialized) {
            //const stackId = drizzle.contracts.FlightSuretyApp.methods.registerAirline(el.value).send({
            drizzle.contracts.FlightSuretyApp.methods.withdraw(el.value).send({
                from: accounts[0],
                gas: 4712388,
                gasPrice: 100000000000
            });
        }
    };

    render() {
        return (
            <div style={{ textAlign: 'center', margin: '50px auto' }}>
                <Paper>
                    <Typography variant="subtitle1" gutterBottom>
                        Buy Insurance:
                    </Typography>
                    <form autoComplete="off">
                        <Grid container direction='row' alignItems='stretch'>
                            <Grid item>
                                <FormControl>
                                    <InputLabel htmlFor="airline-buy">Airline</InputLabel>
                                    <Input
                                        id="airline-buy"
                                        aria-describedby="airline-buy"
                                    />
                                    <FormHelperText id="airline-buy-helper">Airline</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl>
                                    <InputLabel htmlFor="flight-buy">Flight</InputLabel>
                                    <Input
                                        id="flight-buy"
                                        aria-describedby="flight-buy"
                                    />
                                    <FormHelperText id="flight-buy-helper">Flight</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl>
                                    <InputLabel htmlFor="passenger-buy">Passenger</InputLabel>
                                    <Input
                                        id="passenger-buy"
                                        aria-describedby="passenger-buy"
                                    />
                                    <FormHelperText id="passenger-buy-helper">Passenger</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid>
                                <FormControl>
                                    <TextField
                                        id="flight-buy-timestamp"
                                        label="flight-buy-timestamp"
                                        type="datetime-local"
                                        defaultValue="2020-01-01T10:30"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl>
                                    <InputLabel htmlFor="flight-insurance-amount">Insurance Amount in Wei</InputLabel>
                                    <Input
                                        width={1 / 5}
                                        id="flight-insurance-amount"
                                        aria-describedby="flight-insurance-amount"
                                    />
                                    <FormHelperText id="flight-insurance-amount-helper">Input Insurance Amount in wei</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item>
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
                    <Typography component="p">
                        Timestamp is dummy in this implementation. For all the flights, fixed to 2019.12.31 1:1:1
                    </Typography>
                    <Typography component="p">
                        Need to put passenger name as the logic to get name automaticall from the account is not implemented. Sorry for the inconvenience.
                    </Typography>
                </Paper>
                <br />
                <Paper>
                    <Typography variant="subtitle1" gutterBottom>
                        Approve:
                    </Typography>

                    <form autoComplete="off">
                        <Grid container direction='row'>
                            <Grid item>
                                <FormControl>
                                    <InputLabel htmlFor="withdraw-amount">Withdraw Amount</InputLabel>
                                    <Input
                                        id="withdraw-amount"
                                        aria-describedby="withdraw-amount"
                                    />
                                    <FormHelperText id="withdraw-amount-helper">Withdraw Amount</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" onClick={this.handleWithdraw} color="primary">Withdraw</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper >
            </div >
        );
    }
}

export default Passenger;