import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Card, CardHeader, CardActions } from "@material-ui/core";
import { setCurrentUser } from '../redux/actions';

class UserPreview extends Component {

    handleClickViewProfile = () => {
        this.props.setCurrentUser(this.props.user.id)
    }

    render() {
        return (
            <Grid container item xs={12} direction="column">
                <Card variant="outlined" style={{borderColor: "#f8a186bb"}}>
                    <CardHeader title={this.props.user.username} 
                        subheader={`${this.props.user.name} - 
                        ${this.props.user.recipes_count} ${this.props.user.recipes_count === 1 ? "recipe" : "recipes"} - 
                        ${this.props.user.subscribers_count} ${this.props.user.subscribers_count === 1 ? "subscriber" : "subscribers"}`}
                    />
                    <CardActions>
                        <Button size="small" onClick={this.handleClickViewProfile}>View Profile</Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return { setCurrentUser: (userId) => dispatch(setCurrentUser(userId, "subscriptions"))}
}

export default connect(null, mapDispatchToProps)(UserPreview)