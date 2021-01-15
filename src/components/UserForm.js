import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Control } from 'react-redux-form';
import {
    Button,
    Grid,
    Typography,
    TextField
} from "@material-ui/core";
import '../css/UserForm.css';

const UserForm = (props) => {
    const dispatch = useDispatch()
    const page = useSelector(state => state.page)
    const username = useSelector(state => state.username)
    const password = useSelector(state => state.password)
    const passwordConfirmation = useSelector(state => state.passwordConfirmation) 
    const name = useSelector(state => state.name)

    const handleSubmit = (e) => {
        e.preventDefault()

        // Check password confirmation
        if (e.target.passwordConfirmation && e.target.password.value !== e.target.passwordConfirmation.value) {
            alert("Password confirmation does not match. Please try again.")
            return
        }


        let data
        switch (page) {
            case "Sign In":
                data = {
                    username: e.target.username.value,
                    password: e.target.password.value
                }
                break
            case "Settings":
                data = {
                    name: e.target.name.value,
                    password: e.target.password.value
                }
                break
            case "Sign Up":
                data = {
                    name: e.target.name.value,
                    username: e.target.username.value,
                    password: e.target.password.value
                }
                break
            default:
                return
        }
        props.handleSubmit(data)
    }

    const handleInputChange = (e) => {
        const inputField = e.target.getAttribute('name')
        dispatch({ type: "HANDLE_INPUT_CHANGE", payload: {inputField: inputField, value: e.target.value }})
    }
    
    return (
        <div id="user-form">
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item>
                    <Grid container direction="column" justify="center">
                        <Grid item>
                            <Typography component="h1">
                                {page}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <form onSubmit={handleSubmit}>
                                <Grid container direction="column" justify="center">

                                    <Grid item>
                                        {page === "Sign Up" || page === "Sign In" ?
                                            <TextField id="standard-required" label="Username" name="username" value={username} onChange={handleInputChange} required/> :
                                            <TextField id="standard-disabled" label="Username" name="username" value={username} onChange={handleInputChange} disabled/>
                                        }
                                    </Grid>

                                    {page === "Sign Up" || page === "Settings" ?
                                    (<Grid item>
                                        <TextField id="standard-required" label="Name" name="name" value={name} required 
                                        onChange={handleInputChange}/>
                                    </Grid>) :
                                    null}
                                    
                                    
                                {/* </Grid>
                                <Grid container direction="column"> */}
                                    <Grid item>
                                        <TextField id="standard-password-input" type="password" label="Password" name="password" value={password} required onChange={handleInputChange}/>
                                    </Grid>

                                    {page === "Sign Up" || page === "Settings" ?
                                    (<Grid item>
                                        <TextField id="standard-password-input" type="password" label="Confirm Password" name="passwordConfirmation" value={passwordConfirmation} required onChange={handleInputChange}/>
                                    </Grid>) :
                                    null}
                                {/* </Grid>
                                <Grid container direction="row" justify="center"> */}
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

export default UserForm