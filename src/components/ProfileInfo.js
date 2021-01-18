import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from "@material-ui/core";
import { setUserPage } from '../redux/actions';
import '../css/UserPage.css'

class ProfileInfo extends Component {

    render() {
        return (
            <Grid container spacing={1} >
                <Grid container item xs={12} spacing={2} direction="row">
                    <Grid item xs={4}>
                        <div id="profile-photo-container">
                            <img id="profile-photo" src="data:image/jpeg;base64,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" alt="Profile Picture"/>
                        </div>
                    </Grid>
                
                    <Grid container item xs={8} direction="row" justify="center" spacing={1}>
                        <Grid id="profile-username-div" item xs={12} sm={4}>
                            <h2 id="profile-username">{this.props.user.username}</h2>
                        </Grid>
                        <Grid id="edit-profile-div" item xs={12} sm={4}>
                            <Button variant="outlined">Edit Profile</Button> 
                        </Grid> 
                        <Grid id="profile-stats" container item xs={12}>

                            <Grid container item xs={6} direction="column">
                                <Grid className="stat-qty" item>
                                    {this.props.user.likeCount}
                                </Grid>
                                <Grid className="stat-cnt" item>
                                    Likes
                                </Grid>
                                
                            </Grid>
                            <Grid container item xs={6} direction="column">
                                <Grid className="stat-qty" item>
                                    {this.props.recipes.length}
                                </Grid>
                                <Grid className="stat-cnt" item>
                                    Recipes
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container item direction="row" justify="flex-start">
                    <Grid container item direction="column" justify="flex-start">
                        <Grid item >
                            <h3 id="profile-name">{this.props.user.name}</h3>
                        </Grid>
                        <Grid id="user-bio" item>
                            {this.props.user.bio}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item direction="row" justify="center">
                    <Grid container item id="new-recipe-div" justify="center">
                        <Button 
                            id="new-recipe-btn" 
                            variant="outlined" 
                            onClick={() => this.props.setUserPage("form")}
                        >
                            Add New Recipe
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = ({ user, recipes }) => {
    return { user, recipes }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserPage: (page) => dispatch(setUserPage(page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo)