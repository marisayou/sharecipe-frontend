import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import UserPreview from './UserPreview';

class SubscriptionsContainer extends Component {

    renderUserPreviews = () => {
        return this.props.subscriptions.map((user, idx) => {
            return <UserPreview key={idx} user={user} />
        })
    }

    render() {
        return (
            <Grid className="container" container item xs={12} md={9} spacing={1}>
                {this.renderUserPreviews()}
            </Grid>
        )
    }
}

const mapStateToProps = ({ subscriptions }) => {
    return { subscriptions }
}

export default connect(mapStateToProps)(SubscriptionsContainer)