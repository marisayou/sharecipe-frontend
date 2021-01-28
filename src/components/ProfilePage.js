import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeForm from './RecipeForm';
import { Container, Grid, IconButton } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ProfileInfo from './ProfileInfo';
import RecipesContainer from './RecipesContainer';
import RecipePage from './RecipePage';
import TagPage from './TagPage';
import UserPage from './UserPage';
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

class ProfilePage extends Component {

    renderPage = () => {
        console.log(this.props.userPage)
        switch (this.props.userPage) {
            case "user":
                return <UserPage selectMenuItem={this.props.selectMenuItem}/>
            case "form":
                return <RecipeForm />
            case "recipe":
                return <RecipePage /> 
            case "tag":
                return <TagPage />
            default:
                return <UserPage selectMenuItem={this.props.selectMenuItem}/>
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
)(ProfilePage)