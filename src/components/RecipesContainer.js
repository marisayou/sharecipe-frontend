import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import { getUserRecipes, getRecipes, getTagRecipes } from '../redux/actions';
import RecipePreview from './RecipePreview';

class RecipesContainer extends Component {

    componentDidMount() {
        console.log(this.props.menuPage)
        switch (this.props.menuPage) {
            case "home":
                if (this.props.homePage !== "user") {
                    this.props.homePage !== "tag" ?
                        this.props.getRecipes("home", null) :
                        this.props.getTagRecipes(this.props.currentTag)
                }
                break
            case "profile":
                if (this.props.userPage !== "user") {
                    this.props.userPage !== "tag" ?
                        this.props.getUserRecipes(this.props.user.id) :
                        this.props.getTagRecipes(this.props.currentTag)
                }
                break
            case "recipes":
                if (this.props.allRecipesPage !== "user") {
                    this.props.allRecipesPage !== "tag" ?
                        this.props.getRecipes("recipes", this.props.user.id) :
                        this.props.getTagRecipes(this.props.currentTag)
                }
                break
            case "favorites":
                if (this.props.favoritesPage !== "user") {
                    this.props.favoritesPage !== "tag" ?
                        this.props.getRecipes("favorites", this.props.user.id) :
                        this.props.getTagRecipes(this.props.currentTag)
                }
                break
            case "search":
                if (this.props.searchPage === "tag") {
                    this.props.getTagRecipes(this.props.currentTag)
                }
                break
            default:
                return
        }
    }

    renderRecipePreviews = () => {
        return this.props.recipes.map((recipe, idx) => {
            return <RecipePreview key={idx} recipe={recipe}/>
        })
    }

    render() {
        return (
            <Grid className="container" container item xs={12} md={9} spacing={1}>
                {this.renderRecipePreviews()}
            </Grid>
        )
    }
}

const mapStateToProps = ({ user, menuPage, recipes, homePage, userPage, allRecipesPage, favoritesPage, searchPage, currentTag }) => {
    return { user, menuPage, recipes, homePage, userPage, allRecipesPage, favoritesPage, searchPage, currentTag }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserRecipes: (userId) => dispatch(getUserRecipes(userId)),
        getRecipes: (type, userId) => dispatch(getRecipes(type, userId)),
        getTagRecipes: (tagName) => dispatch(getTagRecipes(tagName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesContainer)