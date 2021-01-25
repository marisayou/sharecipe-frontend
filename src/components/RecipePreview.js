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
    setSearchPage,
    favorite, 
    unfavorite 
} from '../redux/actions';

class RecipePreview extends Component {

    handleClickReadMore = async () => {
        console.log(this.props.menuPage)
        await this.props.setCurrentRecipe(this.props.recipe)
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
        console.log(this.props.recipe)
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

const mapStateToProps = ({ user, favorites, currentRecipe, menuPage }) => {
    return { user, favorites, currentRecipe, menuPage }
}

const mapDispatchToProps = dispatch => {
    return { 
        setCurrentRecipe: (recipe) => dispatch(setCurrentRecipe(recipe)),
        setHomePage: (page) => dispatch(setHomePage(page)),
        setUserPage: (page) => dispatch(setUserPage(page)),
        setRecipesPage: (page) => dispatch(setRecipesPage(page)),
        setFavoritesPage: (page) => dispatch(setFavoritesPage(page)),
        setSearchPage: (page) => dispatch(setSearchPage(page)),
        favorite: (recipeId, userId) => dispatch(favorite(recipeId, userId)),
        unfavorite: (recipeId, userId) => dispatch(unfavorite(recipeId, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipePreview)

