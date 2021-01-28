import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from "@material-ui/core";
import { setUserPage, setCurrentRecipe, subscribe, unsubscribe } from '../redux/actions';
import '../css/UserPage.css'

class ProfileInfo extends Component {


    handleAddRecipe = () => {
        this.props.setCurrentRecipe(null)
        this.props.setUserPage("form")
    }

    handleSubscribeClick = () => {
        this.props.subscriptions.map(sub => sub.id).includes(this.props.currentUser.id) ? 
            this.props.unsubscribe(this.props.user.id, this.props.currentUser.id) :
            this.props.subscribe(this.props.user.id, this.props.currentUser.id)
    }

    render() {
        return (
            <Grid container item spacing={1} direction="column" xs={12} md={9} alignItems="center" >
                <Grid container item xs={12} spacing={2} direction="row">

                    <Grid container item xs={12} direction="row" justify="center" spacing={1}>
                        <Grid id="profile-username-div" item xs={12} sm={4}>
                            <h1>{this.props.currentUser.username}</h1>
                        </Grid>
                        <Grid id="profile-name-div" item xs={12} sm={4}>
                            <h3>{this.props.currentUser.name}</h3>
                        </Grid>
                        <Grid id="profile-stats" container item xs={12}>

                            <Grid container item xs={6} direction="column">
                                <Grid className="stat-qty" item>
                                    {this.props.currentUser.subscribers}
                                </Grid>
                                <Grid className="stat-cnt" item>
                                    {this.props.currentUser.subscribers === 1 ? "Subscriber" : "Subscribers"}
                                </Grid>
                                
                            </Grid>
                            <Grid container item xs={6} direction="column">
                                <Grid className="stat-qty" item>
                                    {this.props.recipes.length}
                                </Grid>
                                <Grid className="stat-cnt" item>
                                    {(this.props.recipes.length === 1 ? "Recipe" : "Recipes")}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {this.props.currentUser.id === this.props.user.id && this.props.menuPage === "profile" ? 
                (<Grid container item direction="row" justify="center">
                    <Grid container item className="btn-container" justify="center">
                        
                        <Button 
                            variant="outlined" 
                            onClick={this.handleAddRecipe}
                        >
                            Add Recipe
                        </Button>
                        <Button 
                            variant="outlined" 
                            onClick={() => this.props.selectMenuItem("Settings")}
                        >
                            Edit Profile
                        </Button> 
                        
                    </Grid>
                </Grid>) : null}
                
                {this.props.currentUser.id !== this.props.user.id ?
                (<Grid container item direction="row" justify="center">
                    <Grid container item className="btn-container" justify="center">
                        
                        <Button 
                            variant="outlined" 
                            onClick={this.handleSubscribeClick}
                        >
                            { this.props.subscriptions.map(sub => sub.id).includes(this.props.currentUser.id) ? 
                            "Unsubscribe" : "Subscribe"}
                        </Button>
                        
                    </Grid>
                </Grid>) : null}
            </Grid>
        )
    }
}

const mapStateToProps = ({ user, currentUser, recipes, favorites, subscriptions, menuPage, homePage }) => {
    return { user, currentUser, recipes, favorites, subscriptions, menuPage, homePage }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserPage: (page) => dispatch(setUserPage(page)),
        setCurrentRecipe: (recipe) => dispatch(setCurrentRecipe(recipe)),
        subscribe: (subscribedFromId, subscribedToId) => dispatch(subscribe(subscribedFromId, subscribedToId)),
        unsubscribe: (subscribedFromId, subscribedToId) => dispatch(unsubscribe(subscribedFromId, subscribedToId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo)