import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import { getRecipes } from '../redux/actions';
import RecipePreview from './RecipePreview';

class RecipesContainer extends Component {

    componentDidMount() {
        if (this.props.menuPage !== "profile") {
            const type = this.props.menuPage
            this.props.getRecipes(type, this.props.user.id)
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

const mapStateToProps = ({ user, menuPage, myRecipes, recipes }) => {
    return { user, menuPage, myRecipes, recipes }
}

const mapDispatchToProps = dispatch => {
    return {
        getRecipes: (type, userId) => dispatch(getRecipes(type, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesContainer)