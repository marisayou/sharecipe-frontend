import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import { getRecipes, getTagRecipes } from '../redux/actions';
import RecipePreview from './RecipePreview';

class RecipesContainer extends Component {

    componentDidMount() {
        switch (this.props.menuPage) {
            case "profile":
                // tags
                return
            case "recipes":
                this.props.allRecipesPage !== "tag" ?
                    this.props.getRecipes("recipes", this.props.user.id) :
                    this.props.getTagRecipes(this.props.currentTag)
                break
            case "favorites":
                this.props.favoritesPage !== "tag" ?
                    this.props.getRecipes("favorites", this.props.user.id) :
                    this.props.getTagRecipes(this.props.currentTag)
                break
            default:
                return
        }
    }

    renderRecipePreviews = () => {
        return this.props.menuPage === "profile" ?
        // user's recipes
        this.props.myRecipes.map((recipe, idx) => {
            return (
                <RecipePreview key={idx} recipe={recipe}/>
            )
        }) :
        // all recipes or favorited recipes
        this.props.recipes.map((recipe, idx) => {
            return (
                <RecipePreview key={idx} recipe={recipe}/>
            )
        })
    }

    render() {
        console.log(this.props.recipes)
        return (
            <Grid className="container" container item xs={12} md={9} spacing={1}>
                {this.renderRecipePreviews()}
            </Grid>
        )
    }
}

const mapStateToProps = ({ user, menuPage, myRecipes, recipes, userPage, allRecipesPage, favoritesPage, currentTag }) => {
    return { user, menuPage, myRecipes, recipes, userPage, allRecipesPage, favoritesPage, currentTag }
}

const mapDispatchToProps = dispatch => {
    return {
        getRecipes: (type, userId) => dispatch(getRecipes(type, userId)),
        getTagRecipes: (tagName) => dispatch(getTagRecipes(tagName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesContainer)