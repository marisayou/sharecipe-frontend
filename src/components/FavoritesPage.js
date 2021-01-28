import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid } from "@material-ui/core";
import RecipesContainer from './RecipesContainer';
import RecipePage from './RecipePage';
import TagPage from './TagPage';
import UserPage from './UserPage';

class FavoritesPage extends Component {

    renderPage = () => {
        console.log(this.props.favoritesPage)
        switch (this.props.favoritesPage) {
            case "user":
                return <UserPage />
            case "recipe":
                return <RecipePage />
            case "tag":
                return <TagPage />
            default:
                return (
                    <React.Fragment>
                        <Grid item>
                            <h1>Favorites</h1>
                        </Grid>
                        <Grid container item xs={12} md={9} justify="center">
                            <RecipesContainer/>
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

const mapStateToProps = ({ favoritesPage }) => {
    return { favoritesPage }
}

export default connect(mapStateToProps)(FavoritesPage)