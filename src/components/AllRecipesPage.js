import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid } from "@material-ui/core";
import RecipesContainer from './RecipesContainer';
import RecipePage from './RecipePage';

class AllRecipesPage extends Component {

    renderPage = () => {
        switch (this.props.allRecipesPage) {
            // case "user":
            //     return <UserPage />
            case "recipe":
                return <RecipePage /> 
            default:
                return (
                    <React.Fragment>
                        <Grid item>
                            <h1>All Recipes</h1>
                        </Grid>
                        <RecipesContainer/>
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

const mapStateToProps = ({ allRecipesPage }) => {
    return { allRecipesPage }
}

export default connect(mapStateToProps)(AllRecipesPage)