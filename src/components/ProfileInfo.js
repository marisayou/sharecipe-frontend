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
        return (
            <Grid container item spacing={1} direction="column" xs={12} md={9} alignItems="center" >
                <Grid container item xs={12} spacing={2} direction="row">

                    <Grid container item xs={12} direction="row" justify="center" spacing={1}>
                        <Grid id="profile-username-div" item xs={12} sm={4}>
                            <h1>{this.props.user.username}</h1>
                        </Grid>
                        
                        <Grid id="profile-stats" container item xs={12}>

                            <Grid container item xs={6} direction="column">
                                <Grid className="stat-qty" item>
                                    {this.props.favorites.length}
                                </Grid>
                                <Grid className="stat-cnt" item>
                                    Favorites
                                </Grid>
                                
                            </Grid>
                            <Grid container item xs={6} direction="column">
                                <Grid className="stat-qty" item>
                                    {this.props.myRecipes.length}
                                </Grid>
                                <Grid className="stat-cnt" item>
                                    Recipes
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {/* <Grid container item direction="row" justify="flex-start">
                    <Grid container item direction="column" justify="flex-start">
                        <Grid item >
                            <h3 id="profile-name">{this.props.user.name}</h3>
                        </Grid>
                        <Grid id="user-bio" item>
                            {this.props.user.bio}
                        </Grid>
                    </Grid>
                </Grid> */}
                <Grid container item direction="row" justify="center">
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
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = ({ user, myRecipes, favorites }) => {
    return { user, myRecipes, favorites }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserPage: (page) => dispatch(setUserPage(page)),
        setCurrentRecipe: (recipe) => dispatch(setCurrentRecipe(recipe))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo)