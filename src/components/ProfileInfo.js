import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from "@material-ui/core";
import { setUserPage, setCurrentRecipe } from '../redux/actions';
import '../css/UserPage.css'

class ProfileInfo extends Component {

    handleAddRecipe = () => {
        this.props.setCurrentRecipe(null)
        this.props.setUserPage("form")
    }


    render() {
        console.log(this.props.currentUser)
        return (
            <Grid container item spacing={1} direction="column" xs={12} md={9} alignItems="center" >
                <Grid container item xs={12} spacing={2} direction="row">

                    <Grid container item xs={12} direction="row" justify="center" spacing={1}>
                        <Grid id="profile-username-div" item xs={12} sm={4}>
                            <h1>{this.props.currentUser.username}</h1>
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

                {this.props.currentUser.id === this.props.user.id ? 
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
            </Grid>
        )
    }
}

const mapStateToProps = ({ user, currentUser, recipes, favorites }) => {
    return { user, currentUser, recipes, favorites }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserPage: (page) => dispatch(setUserPage(page)),
        setCurrentRecipe: (recipe) => dispatch(setCurrentRecipe(recipe))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo)