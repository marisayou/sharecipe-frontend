import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import RecipesContainer from './RecipesContainer';


class SearchRecipes extends Component {

    render() {
        console.log(this.props.searchRecipes)
        return (
            <Grid container item direction="row" alignItems="flex-end">
                <Grid item>
                    <h3 id="recipes-header">Recipes</h3>
                </Grid>
                <RecipesContainer />
            </Grid>
        )
    }
}

const mapStateToProps = ({ searchRecipes }) => {
    return { searchRecipes }
}

export default connect(mapStateToProps)(SearchRecipes)
