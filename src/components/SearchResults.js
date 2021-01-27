import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid } from "@material-ui/core";
import TagPage from './TagPage';
import RecipePage from './RecipePage';
import SearchRecipes from './SearchRecipes';
import SearchUsers from './SearchUsers';
import SearchTags from './SearchTags';
import UserPage from './UserPage';

class SearchResults extends Component {

    renderPage = () => {
        switch (this.props.searchPage) {
            case "user":
                return <UserPage />
            case "recipe":
                return <RecipePage /> 
            case "tag":
                return <TagPage />
            default:
                return (
                    <React.Fragment>
                        <Grid container item xs={12} justify="center">
                            <Grid item>
                                <h1>Search Results</h1>
                            </Grid>
                            <SearchTags />
                            <SearchUsers />
                            <SearchRecipes />
                        </Grid>
                    </React.Fragment>
                )   
        }
    }

    render() {
        return (
            <React.Fragment>
                <Container maxWidth="md">
                    <Grid container direction="column" alignItems="center">
                        {this.renderPage()}
                    </Grid>
                </Container>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ searchPage, searchTerm }) => {
    return {searchPage, searchTerm}
}

export default connect(mapStateToProps)(SearchResults)