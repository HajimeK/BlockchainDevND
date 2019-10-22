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

    handleuyInsurance = e => {
        console.log('handleInsurance');
    };

    handleWithdraw = e => {
        console.log('handleWithdraw');
    };

    render() {
        return (
            <div style={{ textAlign: 'center', margin: '50px auto' }}>
                <Paper>
                    <Typography variant="subtitle1" gutterBottom>
                        Approve:
                    </Typography>
                    <form autoComplete="off">
                        <Grid container direction='row' alignItems='stretch'>
                            <Grid item>
                                <FormControl>
                                    <InputLabel htmlFor="airline-list">Airline</InputLabel>
                                    <Select
                                        width={1 / 5}
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
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item>
                                <FormControl>
                                    <InputLabel htmlFor="component-insuranceAmount">Insurance Amount</InputLabel>
                                    <Input
                                        width={1 / 5}
                                        id="component-insuranceAmount"
                                        aria-describedby="component-helper-text"
                                    />
                                    <FormHelperText id="component-helper-text">Input Insurance Amount</FormHelperText>
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
                                    <InputLabel htmlFor="new-flight">Withdraw Amount</InputLabel>
                                    <Input
                                        id="new-flight"
                                        aria-describedby="new-flight-text"
                                    />
                                    <FormHelperText id="new-flight-text">Withdraw Amount</FormHelperText>
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