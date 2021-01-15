import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Typography, TextField } from "@material-ui/core";
import '../css/UserForm.css';

class UserForm extends Component {

    state = {
        name: this.props.user ? this.props.user.name : "",
        username: this.props.user ? this.props.user.username : "",
        password: "",
        passwordConfirmation: ""
    }

    handleSubmit = (e) => {
        e.preventDefault()

        // Check password confirmation in Sign Up and Settings
        if (this.props.form !== "Sign In" && this.state.password !== this.state.passwordConfirmation) {
            alert("Password confirmation does not match. Please try again.")
            return
        }

        let data
        switch (this.props.form) {
            case "Sign In":
                data = {
                    username: this.state.username,
                    password: this.state.password
                }
                break
            case "Settings":
                data = {
                    name: this.state.name,
                    password: this.state.password
                }
                break
            case "Sign Up":
                data = {
                    name: this.state.name,
                    username: this.state.username,
                    password: this.state.password
                }
                break
            default:
                return
        }
        this.props.handleSubmit(this.props.form, data)
    }

    handleInputChange = (e) => {
        const inputField = e.target.getAttribute('name')
        this.setState({ [inputField]: e.target.value})
    }
    
    render() {
        return (
            <div id="user-form">
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item>
                        <Grid container direction="column" justify="center">
                            <Grid item>
                                <Typography component="h1">
                                    {this.props.form}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <form onSubmit={this.handleSubmit}>
                                    <Grid container direction="column" justify="center">
                                        {/* username */}
                                        <Grid item>
                                            {this.props.form === "Sign Up" || this.props.form === "Sign In" ?
                                                <TextField id="standard-required" label="Username" name="username" value={this.state.username} onChange={this.handleInputChange} required/> :
                                                <TextField id="standard-disabled" label="Username" name="username" value={this.state.username} onChange={this.handleInputChange} required disabled/>
                                            }
                                        </Grid>
                                        
                                        {/* name */}
                                        {this.props.form === "Sign Up" || this.props.form === "Settings" ?
                                        (<Grid item>
                                            <TextField id="standard-required" label="Name" name="name" value={this.state.name} required 
                                            onChange={this.handleInputChange}/>
                                        </Grid>) :
                                        null}
                                        
                                        {/* password */}
                                        <Grid item>
                                            <TextField id="standard-password-input" type="password" label="Password" name="password" value={this.state.password} required onChange={this.handleInputChange}/>
                                        </Grid>
                                        
                                        {/* password confirmation */}
                                        {this.props.form === "Sign Up" || this.props.form === "Settings" ?
                                        (<Grid item>
                                            <TextField id="standard-password-input" type="password" label="Confirm Password" name="passwordConfirmation" value={this.state.passwordConfirmation} required onChange={this.handleInputChange}/>
                                        </Grid>) :
                                        null}

                                        <Grid item>
                                            <Grid container direction="row" justify="center">
                                                <Button type="submit">Submit</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = ({ user }) => {
    return { user }
  }

export default connect(mapStateToProps)(UserForm)