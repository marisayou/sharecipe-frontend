import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeForm from './RecipeForm';
import { Container, Grid, IconButton } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ProfileInfo from './ProfileInfo';
import RecipesContainer from './RecipesContainer';
import RecipePage from './RecipePage';
import TagPage from './TagPage';
import {
    popNestedPage,
    setCurrentRecipe,
    setHomePage,
    setRecipesPage,
    setFavoritesPage,
    setSubscriptionsPage,
    setSearchPage
} from '../redux/actions';

class UserPage extends Component {

    handleBackButtonClick = () => {
        console.log(this.props)
        if (this.props.nested.pageStack.length > 0)
        {
            // pop the previous page type. 
            const prevPage = this.props.nested.pageStack[0]
            this.props.popNestedPage()
            switch (prevPage) {
                case "recipe":
                    const prevRecipe = this.props.nested.recipeStack[0]
                    this.props.setCurrentRecipe(prevRecipe)
                    switch(this.props.menuPage) {
                        case "home":
                            this.props.setHomePage("recipe")
                            break
                        case "profile":
                            this.props.setUserPage("recipe")
                            break
                        case "recipes":
                            this.props.setRecipesPage("recipe")
                            break
                        case "favorites":
                            this.props.setFavoritesPage("recipe")
                            break
                        case "subscriptions":
                            this.props.setSubscriptionsPage("recipe")
                            break
                        case "search":
                            this.props.setSearchPage("recipe")
                            break
                        default:
                            return
                    }
                    break
                default:
                    console.log("WHAT THE FUCK DID YOU DO TO GET HERE")
                    // really shouldn't be here...
                    this.props.setHomePage("default")
                    break
            }
        }
        else
        {
            switch (this.props.menuPage) {
                case "home":
                    this.props.setHomePage("default")
                    break
                case "profile":
                    this.props.setUserPage("default")
                    break
                case "recipes":
                    this.props.setRecipesPage("default")
                    break
                case "favorites":
                    this.props.setFavoritesPage("default")
                    break
                case "subscriptions":
                    this.props.setSubscriptionsPage("default")
                    break
                case "search":
                    this.props.setSearchPage("default")
                    break
                default:
                    break
            }
        }
    }

    renderPage = () => {
        switch (this.props.userPage) {
            case "form":
                return <RecipeForm />
            case "recipe":
                return <RecipePage /> 
            case "tag":
                return <TagPage />
            default:
                return (
                    <React.Fragment>
                        <Grid container item xs={12} justify="center">
                            <ProfileInfo selectMenuItem={this.props.selectMenuItem}/>
                        </Grid>
                        <br />
                        <RecipesContainer/>
                    </React.Fragment>
                )   
        }
    }

    render() {
        return (
            <React.Fragment>
                <Container maxWidth="md">
                    <Grid container item xs={12}>
                        <Grid item className="back-btn" xs={1}>
                            <IconButton onClick={this.handleBackButtonClick}>
                                <ArrowBackIcon fontSize="large"/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid container direction="column" alignItems="center">
                        {this.renderPage()}
                    </Grid>
                </Container>
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
        setSearchPage: (page) => dispatch(setSearchPage(page))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPage)