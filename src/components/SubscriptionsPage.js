import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid } from "@material-ui/core";
import RecipePage from './RecipePage';
import TagPage from './TagPage';
import UserPage from './UserPage';
import SubscriptionsContainer from './SubscriptionsContainer';

class SubscriptionsPage extends Component {

    renderPage = () => {
        switch (this.props.subscriptionsPage) {
            case "user":
                return <UserPage />
            case "recipe":
                return <RecipePage />
            case "tag":
                return <TagPage />
            default:
                return (
                    <React.Fragment>
                        <Grid item>
                            <h1>Subscriptions</h1>
                        </Grid>
                        <SubscriptionsContainer />
                    </React.Fragment>
                )   
        }
    }
    render() {
        return (
            <React.Fragment>
                <Container maxWidth="md">
                    <Grid container direction="column" alignItems="center">
                        {this.renderPage()}
                    </Grid>
                </Container>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ subscriptionsPage }) => {
    return { subscriptionsPage }
}

export default connect(mapStateToProps)(SubscriptionsPage)