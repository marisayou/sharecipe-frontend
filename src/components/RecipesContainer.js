import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import { getRecipes } from '../redux/actions';
import RecipePreview from './RecipePreview';

class RecipesContainer extends Component {

    componentDidMount() {
        if (this.props.menuPage === "recipes") {
            this.props.getRecipes()
        }
    }

    renderRecipePreviews = () => {
        return this.props.menuPage === "profile" ?
        this.props.recipes.map((recipe, idx) => {
            return (
                <RecipePreview key={idx} recipe={recipe}/>
            )
        }) :
        this.props.allRecipes.map((recipe, idx) => {
            return (
                <RecipePreview key={idx} recipe={recipe}/>
            )
        })
    }

    render() {
        return (
            <Grid container item xs={12} md={9} spacing={1}>
                {this.renderRecipePreviews()}
            </Grid>
        )
    }
}

const mapStateToProps = ({ menuPage, recipes, allRecipes }) => {
    return { menuPage, recipes, allRecipes }
}

const mapDispatchToProps = dispatch => {
    return {
        getRecipes: () => dispatch(getRecipes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesContainer)