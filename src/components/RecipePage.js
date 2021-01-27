import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Card, CardContent, TextField, Button, IconButton } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { 
    setUserPage, 
    setHomePage,
    setRecipesPage, 
    setFavoritesPage,
    setSubscriptionsPage,
    setSearchPage,
    setCurrentRecipe, 
    deleteRecipe, 
    favorite,
    unfavorite,
    addComment,
    setCurrentTag,
    setCurrentUser
} from '../redux/actions';
import '../css/RecipePage.css';

class RecipePage extends Component {

    state = {
        comment: ""
    }

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
        return this.props.tags.map(tag => {
            return <Button key={tag.name} onClick={() => this.handleTagClick(tag.name)}>{'#' + tag.name}</Button>
        })
    }

    handleTagClick = (tagName) => {
        this.props.setCurrentTag(tagName)
        switch (this.props.menuPage) {
            case "home":
                this.props.setHomePage("tag")
                break
            case "profile":
                this.props.setUserPage("tag")
                break
            case "recipes":
                this.props.setRecipesPage("tag")
                break
            case "favorites":
                this.props.setFavoritesPage("tag")
                break
            case "subscriptions":
                this.props.setSubscriptionsPage("tag")
                break
            case "search":
                this.props.setSearchPage("tag")
                break
            default:
                return
        }
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

    handleUsernameClick = async () => {
        this.props.setCurrentUser(this.props.currentRecipe.user.id, this.props.menuPage)
    }

    handleBackButtonClick = () => {
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
        this.props.setCurrentRecipe(null)
    }

    handleDeleteButtonClick = async () => {
        await this.props.setUserPage("default")
        this.props.deleteRecipe(this.props.id)
        
    }

    handleFavoriteClick = () => {
        const recipeId = this.props.currentRecipe.id
        const userId = this.props.user.id

        this.props.favorites.includes(recipeId) ? 
            this.props.unfavorite(recipeId, userId) :
            this.props.favorite(recipeId, userId)
    }

    handleCommentFormSubmit = (e) => {
        e.preventDefault()

        // don't post comment if it's blank or only contains spaces
        if (this.state.comment.replace(/ +/g, "") === "") {
            this.setState({ comment: "" })
            return
        }

        this.props.addComment(this.props.user.id, this.props.currentRecipe.id, this.state.comment)
        this.setState({ comment: "" })
    }

    renderComments = () => {
        if (this.props.currentRecipe.comments.length === 0) {
            return <p>Be the first to comment on this recipe!</p>
        }
        return this.props.currentRecipe.comments.map((comment, idx) => {
            return (
                <Grid key={idx}item xs={12}>
                    <Card variant="outlined">
                        <CardContent className="comment-card">
                            <p className="comment-user">{comment.user}</p>
                            <p>{comment.text}</p>
                        </CardContent>
                    </Card>
                    <br/>
                </Grid>
                
            )
        })
    }

    render() {
        console.log(this.props.currentRecipe)
        console.log(this.props.user)
        console.log(this.props.favorites)
        return (
            <React.Fragment>
                <Grid container item className="container" direction="column" xs={12} md={9} alignItems="center">
                    
                    <Grid container item xs={12}>
                        <Grid item className="back-btn" xs={1}>
                            <IconButton onClick={this.handleBackButtonClick}>
                                <ArrowBackIcon fontSize="large"/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={10}><h1 id="recipe-title">{this.props.title}</h1></Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={this.handleUsernameClick}>{this.props.currentRecipe.user ? this.props.currentRecipe.user.username :null}</Button>
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
                    <Grid item container xs={12}>
                        <img className="recipe-image" src={this.props.currentRecipe.image_url} />
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
                    <br />
                    {this.props.currentRecipe.user.id === this.props.user.id ?
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

                    <br />
                    <Grid container item xs={12}>
                        <Grid item>
                            <h3>Comments</h3>
                        </Grid>
                        <Grid container item>
                            {this.renderComments()}
                        </Grid>
                    </Grid>
                    
                    <Grid container item xs={12}>
                        <Grid item>
                            <h3>Leave a Comment!</h3>
                        </Grid>
                        <form onSubmit={this.handleCommentFormSubmit}>
                            <Grid container item xs={12}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        label="Comment" 
                                        value={this.state.comment} 
                                        onChange={(e) => this.setState({ comment: e.target.value })}
                                        multiline 
                                        rows={3}
                                    />
                                </Grid>
                                <Grid item className="btn-container">
                                    <Button type="submit" variant="outlined">Post Comment</Button>
                                </Grid>
                                
                            </Grid>
                        </form>
                    </Grid>
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
        setHomePage: (page) => dispatch(setHomePage(page)),
        setRecipesPage: (page) => dispatch(setRecipesPage(page)),
        setFavoritesPage: (page) => dispatch(setFavoritesPage(page)),
        setSubscriptionsPage: (page) => dispatch(setSubscriptionsPage(page)),
        setSearchPage: (page) => dispatch(setSearchPage(page)),
        setCurrentRecipe: (recipe) => dispatch(setCurrentRecipe(recipe)),
        deleteRecipe: (id) => dispatch(deleteRecipe(id)),
        favorite: (recipeId, userId) => dispatch(favorite(recipeId, userId)),
        unfavorite: (recipeId, userId) => dispatch(unfavorite(recipeId, userId)),
        addComment: (userId, recipeId, comment) => dispatch(addComment(userId, recipeId, comment)),
        setCurrentTag: (tagName) => dispatch(setCurrentTag(tagName)),
        setCurrentUser: (userId, menuPage) => dispatch(setCurrentUser(userId, menuPage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage)