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



class Airline extends React.Component {

    handleApprove = e => {
        console.log('handleAPprove');
    };

    handleFund = e => {
        console.log('handleFund');
    };

    handleNewFlight = e => {
        console.log('handleNewFlight');
    };

    handleFlightStatus = e => {
        console.log('handleFlightStatus');
    };


    render() {
        return (
            <div style={{ textAlign: 'center', margin: '50px auto' }}>
                <Paper>
                    <Typography variant="subtitle1" gutterBottom>
                        Approve:
                    </Typography>
                    <form autoComplete="off">
                        <Grid container direction='row' spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    id="newName"
                                    label="newName"
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" onClick={this.handleApprove} color="primary">Approve</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
                <br />
                <Divider />
                <Typography variant="subtitle1" gutterBottom>
                    Fund:
                </Typography>
                <Paper>
                    <form autoComplete="off">
                        <Grid container direction='row' spacing={3}>
                            <Grid item xs={6}>
                                <FormControl>
                                    <InputLabel htmlFor="fund-amount">Fund</InputLabel>
                                    <Input
                                        id="fund-amount"
                                        value={this.props.fundAmount}
                                        aria-describedby="fund-amount-text"
                                    />
                                    <FormHelperText id="fund-amount-text">Fund more than 1 ether</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" onClick={this.handleFund} color="primary">Fund</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
                <br />
                <Divider />
                <Typography variant="subtitle1" gutterBottom>
                    Register Flight:
                </Typography>
                <Paper>
                    <form autoComplete="off">
                        <Grid container direction='row' spacing={3}>
                            <Grid item xs={6}>
                                <FormControl>
                                    <InputLabel htmlFor="new-flight">Register Flight</InputLabel>
                                    <Input
                                        id="new-flight"
                                        value={this.props.newFlight}
                                        aria-describedby="new-flight-text"
                                    />
                                    <FormHelperText id="new-flight-text">Register flight</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" onClick={this.handleNewFlight} color="primary">Register</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
                <br />
                <Divider />
                <Typography variant="subtitle1" gutterBottom>
                    Update Flight Status:
                </Typography>
                <Paper>
                    <form autoComplete="off">
                        <Grid container direction='row' spacing={3}>
                            <Grid item xs={3}>
                                <FormControl>
                                    <Select
                                        width={1 / 5}
                                        value={this.props.airline}
                                        inputProps={{ name: 'airline', id: 'airline-list', }}>
                                        <MenuItem value={10}>JAL</MenuItem>
                                        <MenuItem value={20}>ANA</MenuItem>
                                        <MenuItem value={30}>AA</MenuItem>
                                    </Select>
                                    <InputLabel htmlFor="flight-status">Airline</InputLabel>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl>
                                    <Select
                                        value={this.props.flight}
                                        inputProps={{ name: 'flight', id: 'flight-list', }}>
                                        <MenuItem value={10}>001</MenuItem>
                                        <MenuItem value={20}>002</MenuItem>
                                        <MenuItem value={30}>003</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl>
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
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl>
                                    <Button variant="contained" onClick={this.handleFlightStatus} color="primary">Flight Status Update</Button>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </div>
        );
    }
}

export default Airline;