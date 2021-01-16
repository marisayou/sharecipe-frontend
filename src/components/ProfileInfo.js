import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Button, Typography, CssBaseline } from "@material-ui/core";

class ProfileInfo extends Component {

    render() {
        return (
            // <React.Fragment>
            //     <Container>
            //         <div>Profile</div>
            //     </Container>
            // </React.Fragment>
            <div>Profile</div>
        )
    }
}

export default connect()(ProfileInfo)