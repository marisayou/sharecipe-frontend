import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Card, CardHeader, CardContent, CardActions, Typography, IconButton } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { 
    setCurrentRecipe, 
    setHomePage,
    setUserPage, 
    setRecipesPage, 
    setFavoritesPage,
    setSubscriptionsPage,
    setSearchPage,
    favorite, 
    unfavorite,
    addNestedPage,
    addNestedTag,
    addNestedUser
} from '../redux/actions';

class RecipePreview extends Component {

    getCurrentPageType = (menuPage, homePage, userPage, favoritesPage, subscriptionsPage, allRecipesPage, searchPage) =>
    {
        switch (menuPage) {
            case "home":
                return homePage
            case "profile":
                return userPage
            case "recipes":
                return allRecipesPage
            case "favorites":
                return favoritesPage
            case "subscriptions":
                return subscriptionsPage
            case "search":
                return searchPage
            default:
                return homePage
        }
    }
    handleClickReadMore = async () => {
        console.log(this.props.menuPage)
        const currentPage = this.getCurrentPageType(
            this.props.menuPage,
            this.props.homePage,
            this.props.userPage,
            this.props.favoritesPage,
            this.props.subscriptionsPage,
            this.props.allRecipesPage,
            this.props.searchPage
        )
        console.log(currentPage)
        this.props.addNestedPage(currentPage)

        switch(currentPage) {
            case "user":
                this.props.addNestedUser(this.props.currentUser)
                break
            case "tag":
                this.props.addNestedTag(this.props.tag)
                break
            default:
                console.log("SHOULDNT BE HERE!!)*H#Q(*RH(@UQFON")
                break
        }

        await this.props.setCurrentRecipe(this.props.recipe)
        switch(this.props.menuPage) {
            case "home":
                //this.props.addNestedPage("")
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
    }

    handleFavoriteClick = () => {
        const recipeId = this.props.recipe.id
        const userId = this.props.user.id

        this.props.favorites.includes(recipeId) ? 
            this.props.unfavorite(recipeId, userId) :
            this.props.favorite(recipeId, userId)
    }

    render() {
        return (
            <Grid container item xs={12} direction="column">
                <Card variant="outlined">
                    <CardHeader title={this.props.recipe.title} />
                    <CardContent>
                        <Typography variant="body2" component="p">
                            {this.props.recipe.description}
                        </Typography>
                    </CardContent>
                    <CardActions >
                        <IconButton onClick={this.handleFavoriteClick}>
                            <FavoriteIcon color={this.props.favorites.includes(this.props.recipe.id) ? "error" : "inherit"}/>
                        </IconButton>
                        <Button size="small" onClick={this.handleClickReadMore}>Read More</Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    }
}

const mapStateToProps = ({ user, currentUser, favorites, currentRecipe, menuPage, nested, homePage, userPage, favoritesPage, subscriptionsPage, allRecipesPage, searchPage }) => {
    return { user, currentUser, favorites, currentRecipe, menuPage, nested, homePage, userPage, favoritesPage, subscriptionsPage, allRecipesPage, searchPage }
}

const mapDispatchToProps = dispatch => {
    return { 
        setCurrentRecipe: (recipe) => dispatch(setCurrentRecipe(recipe)),
        setHomePage: (page) => dispatch(setHomePage(page)),
        setUserPage: (page) => dispatch(setUserPage(page)),
        setRecipesPage: (page) => dispatch(setRecipesPage(page)),
        setFavoritesPage: (page) => dispatch(setFavoritesPage(page)),
        setSubscriptionsPage: (page) => dispatch(setSubscriptionsPage(page)),
        setSearchPage: (page) => dispatch(setSearchPage(page)),
        favorite: (recipeId, userId) => dispatch(favorite(recipeId, userId)),
        unfavorite: (recipeId, userId) => dispatch(unfavorite(recipeId, userId)),
        addNestedPage: (page) => dispatch(addNestedPage(page)),
        addNestedTag: (tag) => dispatch(addNestedTag(tag)),
        addNestedUser: (user) => dispatch(addNestedUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipePreview)

