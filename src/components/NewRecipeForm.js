import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Typography, TextField } from "@material-ui/core";
import '../css/UserForm.css';

class NewRecipeForm extends Component {
    
    render() {
        return (
            <React.Fragment>
                <Button onClick={this.props.closeRecipeForm}>X</Button>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ user }) => {
    return { user }
    }

export default connect(mapStateToProps)(NewRecipeForm)