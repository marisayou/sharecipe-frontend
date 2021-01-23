import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, TextField } from "@material-ui/core";
import { deleteUser } from '../redux/actions';
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

    handleDeleteAccount = () => {
        this.props.selectMenuItem("Logout")
        this.props.deleteUser(this.props.user.id)
    }
    
    render() {
        return (
            <div id="user-form">
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid container item direction="column" justify="center">
                        <Grid item>
                            <h1>{this.props.form}</h1>
                        </Grid>
                        <form onSubmit={this.handleSubmit}>
                            <Grid container item direction="column" justify="center" alignItems="center" xs={12}>
                            
                            
                                {/* username */}
                                <Grid container item direction="row" xs={12} sm={8} md={6} justify="center">
                                    {this.props.form === "Sign Up" || this.props.form === "Sign In" ?
                                        <TextField className="textfield" label="Username" name="username" value={this.state.username} onChange={this.handleInputChange} required/> :
                                        <TextField className="textfield" label="Username" name="username" value={this.state.username} onChange={this.handleInputChange} required disabled/>
                                    }
                                </Grid>
                                
                                {/* name */}
                                {this.props.form === "Sign Up" || this.props.form === "Settings" ?
                                (<Grid container item direction="row" xs={12} sm={8} md={6} justify="center">
                                    <TextField className="textfield" label="Name" name="name" value={this.state.name} required 
                                    onChange={this.handleInputChange}/>
                                </Grid>) :
                                null}
                                
                                {/* password */}
                                <Grid container item direction="row" xs={12} sm={8} md={6} justify="center">
                                    <TextField className="textfield" type="password" label="Password" name="password" value={this.state.password} required onChange={this.handleInputChange}/>
                                </Grid>
                                
                                {/* password confirmation */}
                                {this.props.form === "Sign Up" || this.props.form === "Settings" ?
                                (<Grid container item direction="row" xs={12} sm={8} md={6} justify="center">
                                    <TextField className="textfield" type="password" label="Confirm Password" name="passwordConfirmation" value={this.state.passwordConfirmation} required onChange={this.handleInputChange}/>
                                </Grid>) :
                                null}

                                <Grid className="btn-container" container item direction="row" justify="center">
                                    <Button variant="outlined" type="submit">Submit</Button>
                                </Grid>
                                {this.props.form === "Settings" ? 
                                (<Grid className="btn-container" container item direction="row" justify="center">
                                    <Button variant="outlined" onClick={this.handleDeleteAccount}>Delete Account</Button>
                                </Grid>) :
                                null}

                                <br/>
                                

                            </Grid>
                        </form>
                        {this.props.form === "Sign In" ? 
                        (
                            <Grid container item direction="row" justify="center">
                                <p className="no-account">Don't have an account? <span className="signup-link" onClick={() => this.props.signIn(false)}>Sign Up</span></p>
                            </Grid>
                        ) : 
                        null }

{                       this.props.form === "Sign Up" ? 
                        (
                            <Grid container item direction="row" justify="center">
                                <p className="no-account">Go back to <span className="signup-link" onClick={() => this.props.signIn(true)}>Sign In</span></p>
                            </Grid>
                        ) : 
                        null }
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = ({ user }) => {
    return { user }
}

const mapDispatchToProps = dispatch => {
    return { deleteUser: (userId) => dispatch(deleteUser(userId)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)