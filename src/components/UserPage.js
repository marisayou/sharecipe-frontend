import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, IconButton } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ProfileInfo from './ProfileInfo';
import RecipesContainer from './RecipesContainer';
import {
    popNestedPage,
    setCurrentRecipe,
    setHomePage,
    setRecipesPage,
    setFavoritesPage,
    setSubscriptionsPage,
    setSearchPage,
    setUserPage
} from '../redux/actions';

class UserPage extends Component {

    handleBackButtonClick = async () => {
        if (this.props.nested.pageStack.length > 0)
        {
            // pop the previous page type. 
            const prevPage = this.props.nested.pageStack[0]
            await this.props.popNestedPage()
            switch (prevPage) {
                case "recipe":
                    const prevRecipe = this.props.nested.recipeStack[0]
                    await this.props.setCurrentRecipe(prevRecipe)
                    switch(this.props.menuPage) {
                        case "home":
                            await this.props.setHomePage("recipe")
                            break
                        case "profile":
                            await this.props.setUserPage("recipe")
                            break
                        case "recipes":
                            await this.props.setRecipesPage("recipe")
                            break
                        case "favorites":
                            await this.props.setFavoritesPage("recipe")
                            break
                        case "subscriptions":
                            await this.props.setSubscriptionsPage("recipe")
                            break
                        case "search":
                            await this.props.setSearchPage("recipe")
                            break
                        default:
                            return
                    }
                    break
                default:
                    // really shouldn't be here...
                    await this.props.setHomePage("default")
                    break
            }
        }
        else
        {
            switch (this.props.menuPage) {
                case "home":
                    await this.props.setHomePage("default")
                    break
                case "profile":
                    await this.props.setUserPage("default")
                    break
                case "recipes":
                    await this.props.setRecipesPage("default")
                    break
                case "favorites":
                    await this.props.setFavoritesPage("default")
                    break
                case "subscriptions":
                    await this.props.setSubscriptionsPage("default")
                    break
                case "search":
                    await this.props.setSearchPage("default")
                    break
                default:
                    break
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.menuPage !== "profile" || 
                (this.props.menuPage === "profile" && this.props.userPage !== "default") ?
                (<Grid container item xs={12} md={9}>
                    <Grid item className="back-btn" xs={1}>
                        <IconButton onClick={this.handleBackButtonClick}>
                            <ArrowBackIcon fontSize="large"/>
                        </IconButton>
                    </Grid>
                </Grid>) :
                null}
                <Grid container item xs={12} justify="center">
                    <ProfileInfo selectMenuItem={this.props.selectMenuItem}/>
                </Grid>
                <br />
                <Grid container item xs={12} md={9} justify="center">
                    <RecipesContainer/>
                </Grid>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ user, recipes, currentRecipe, menuPage, userPage, nested }) => {
    return { user, recipes, currentRecipe, menuPage, userPage, nested }
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentRecipe: (recipe) => dispatch(setCurrentRecipe(recipe)),
        popNestedPage: () => dispatch(popNestedPage()),
        setHomePage: (page) => dispatch(setHomePage(page)),
        setRecipesPage: (page) => dispatch(setRecipesPage(page)),
        setFavoritesPage: (page) => dispatch(setFavoritesPage(page)),
        setSubscriptionsPage: (page) => dispatch(setSubscriptionsPage(page)),
        setSearchPage: (page) => dispatch(setSearchPage(page)),
        setUserPage: (page) => dispatch(setUserPage(page))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPage)