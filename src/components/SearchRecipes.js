import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import RecipesContainer from './RecipesContainer';


class SearchRecipes extends Component {

    render() {
        return (
            <Grid container item direction="row" alignItems="flex-end">
                <Grid item xs={12}>
                    <h3 className="search-header">Recipes</h3>
                </Grid>
                {this.props.recipes.length === 0 ? 
                    <Grid item className="no-results">
                        <p>No matches found for "{this.props.searchTerm}"</p>
                    </Grid> :
                    <RecipesContainer />
                }
            </Grid>
        )
    }
}

const mapStateToProps = ({ recipes, searchTerm }) => {
    return { recipes, searchTerm }
}

export default connect(mapStateToProps)(SearchRecipes)
