import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Button, Typography, CssBaseline } from "@material-ui/core";
import ProfileInfo from './ProfileInfo';

class UserPage extends Component {

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="md">
                    <Grid container direction="column" style={{ backgroundColor: '#cfe8fc', height: '100vh'}}>
                        <Grid container item>
                            <ProfileInfo />
                        </Grid>

                    </Grid>
                </Container>
            </React.Fragment>
        )
        
    }
}

const mapStateToProps = ({ user }) => {
    return { user }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPage)