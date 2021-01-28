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
import '../css/RecipePreview.css';

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
        console.log("CLICK READ MORE")
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
        await this.props.addNestedPage(currentPage)

        switch(currentPage) {
            case "user":
                await this.props.addNestedUser(this.props.currentUser)
                break
            case "tag":
                await this.props.addNestedTag(this.props.currentTag)
                break
            default:
                break
        }

        await this.props.setCurrentRecipe(this.props.recipe)
        switch(this.props.menuPage) {
            case "home":
                await this.props.setHomePage("recipe")
                break
            case "profile":
                console.log("HERE")
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
    }

    handleFavoriteClick = () => {
        const recipeId = this.props.recipe.id
        const userId = this.props.user.id

        this.props.favorites.includes(recipeId) ? 
            this.props.unfavorite(recipeId, userId) :
            this.props.favorite(recipeId, userId)
    }

    render() {
        console.log(this.props.recipe)
        return (
            <Grid container item xs={12} direction="column">
                <Card 
                    variant="outlined" 
                    style={{
                        backgroundImage: `url(${this.props.recipe.image_url})`, 
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }} 
                >
                    <div className="overlay text">                        
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
                    </div>

                </Card>
            </Grid>
        )
    }
}

const mapStateToProps = ({ user, currentUser, favorites, currentRecipe, currentTag, menuPage, nested, homePage, userPage, favoritesPage, subscriptionsPage, allRecipesPage, searchPage }) => {
    return { user, currentUser, favorites, currentRecipe, currentTag, menuPage, nested, homePage, userPage, favoritesPage, subscriptionsPage, allRecipesPage, searchPage }
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

