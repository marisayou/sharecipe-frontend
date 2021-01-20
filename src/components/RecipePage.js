import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, IconButton } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { 
    setUserPage, 
    setRecipesPage, 
    setFavoritesPage,
    setCurrentRecipe, 
    deleteRecipe, 
    favorite,
    unfavorite
} from '../redux/actions';
import '../css/RecipePage.css';

class RecipePage extends Component {

    renderDescription = () => {
        const paragraphs = this.props.description.split("\n")
        return paragraphs.map((para, idx) => {
            return (
                <Grid container item key={idx}>
                    <p>{para}</p>
                </Grid>
            )
        })
    }

    renderTags = () => {
        return this.props.tags.map(tag => <Button key={tag.name}>{'#' + tag.name}</Button>)
    }

    renderIngredients = () => {
        return this.props.ingredients.map((ing, idx) => {
            const wholeNum = ing.wholeNum === "0" ? "" : `${ing.wholeNum} `
            const fracNum = ing.fracNum === "0" ? "" : `${ing.fracNum} `
            const unit = ing.unit === "none" ? "" : `${ing.unit} `
            const ingredient = ing.ingredient
            return (
                <Grid container item key={idx}>
                    <p>{wholeNum+fracNum+unit+ingredient}</p>
                </Grid>
            )
        })
    }

    renderInstructions = () => {
        const instructions = this.props.instructions.split("\n")
        return instructions.map((ins, idx) => {
            return (
                <Grid container item key={idx}>
                    <p>{ins}</p>
                </Grid>
            )
        })
    }

    handleBackButtonClick = async () => {
        switch (this.props.menuPage) {
            case "profile":
                await this.props.setUserPage("profile")
                break
            case "recipes":
                await this.props.setRecipesPage("all")
                break
            case "favorites":
                await this.props.setFavoritesPage("all")
                break
            default:
                break
        }
        this.props.setCurrentRecipe(null)
    }

    handleDeleteButtonClick = async () => {
        await this.props.setUserPage("profile")
        this.props.deleteRecipe(this.props.id)
        
    }

    handleFavoriteClick = () => {
        const recipeId = this.props.currentRecipe.id
        const userId = this.props.user.id

        this.props.favorites.includes(recipeId) ? 
            this.props.unfavorite(recipeId, userId) :
            this.props.favorite(recipeId, userId)
    }

    render() {
        console.log(this.props.currentRecipe)
        console.log(this.props.user)
        console.log(this.props.favorites)
        return (
            <React.Fragment>
                <Grid container item direction="column" xs={12} md={9} alignItems="center">
                    
                    <Grid container item xs={12}>
                        <Grid item className="back-btn" xs={1}>
                            <IconButton onClick={this.handleBackButtonClick}>
                                <ArrowBackIcon fontSize="large"/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={10}><h1 id="recipe-title">{this.props.title}</h1></Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {this.props.menuPage === "profile" ? 
                            <Button onClick={this.handleBackButtonClick}>{this.props.user.username}</Button> : 
                            <Button>{this.props.currentRecipe.user.username}</Button>
                        }
                    </Grid>
                    <Grid container item justify="center">
                        <IconButton onClick={this.handleFavoriteClick}>
                            <FavoriteIcon fontSize="large" 
                            color={this.props.favorites.includes(this.props.currentRecipe.id) ? "error" : "inherit"}/>
                        </IconButton>
                    </Grid>
                    <Grid id="tags" item container xs={12}>
                        {this.renderTags()}
                    </Grid>
                    <Grid id="description" item container xs={12}>
                        {this.renderDescription()}
                    </Grid>
                    <br/>
                    <Grid id="ingredients-instructions" container item xs={12}>
                        <Grid item>
                            <h3>Ingredients</h3>
                        </Grid>
                        {this.renderIngredients()}
                        <br/>
                        <Grid item>
                            <h3>Instructions</h3>
                        </Grid>
                        <Grid container item>
                            {this.renderInstructions()}
                        </Grid>
                    </Grid>

                    {this.props.menuPage === "profile" ?
                        (<Grid className="btn-container" container item justify="center">
                            <Button variant="outlined" 
                                onClick={() => this.props.setUserPage("form")}
                            >
                                Edit
                            </Button>
                            <Button variant="outlined" 
                                onClick={this.handleDeleteButtonClick}
                            >
                                Delete
                            </Button>
                        </Grid>) :
                        null
                    }
                </Grid>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ user, favorites, currentRecipe, menuPage }) => {
    const { id, title, description, ingredients, instructions, tags } = currentRecipe
    return { user, favorites, currentRecipe, menuPage, id, title, description, ingredients, instructions, tags }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserPage: (page) => dispatch(setUserPage(page)),
        setRecipesPage: (page) => dispatch(setRecipesPage(page)),
        setFavoritesPage: (page) => dispatch(setFavoritesPage(page)),
        setCurrentRecipe: (recipe) => dispatch(setCurrentRecipe(recipe)),
        deleteRecipe: (id) => dispatch(deleteRecipe(id)),
        favorite: (recipeId, userId) => dispatch(favorite(recipeId, userId)),
        unfavorite: (recipeId, userId) => dispatch(unfavorite(recipeId, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage)