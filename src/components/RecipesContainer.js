import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import RecipePreview from './RecipePreview';

class RecipesContainer extends Component {

    renderRecipePreviews = () => {
        return this.props.recipes.map(recipe => {
            return (
                <RecipePreview recipe={recipe}/>
            )
        })
    }

    render() {
        return (
            <Grid container item xs={12} spacing={1}>
                {this.renderRecipePreviews()}
            </Grid>
        )
    }
}

const mapStateToProps = ({ recipes }) => {
    return { recipes }
}

export default connect(mapStateToProps)(RecipesContainer)