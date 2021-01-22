import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeForm from './RecipeForm';
import { Container, Grid } from "@material-ui/core";
import ProfileInfo from './ProfileInfo';
import RecipesContainer from './RecipesContainer';
import RecipePage from './RecipePage';
import TagPage from './TagPage';

class UserPage extends Component {

    renderPage = () => {
        switch (this.props.userPage) {
            case "form":
                return <RecipeForm />
            case "recipe":
                return <RecipePage /> 
            case "tag":
                return <TagPage />
            default:
                return (
                    <React.Fragment>
                        <Grid container item xs={12} justify="center">
                            <ProfileInfo selectMenuItem={this.props.selectMenuItem}/>
                        </Grid>
                        <br />
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

const mapStateToProps = ({ user, recipes, currentRecipe, userPage }) => {
    return { user, recipes, currentRecipe, userPage }
}

export default connect(
    mapStateToProps
)(UserPage)