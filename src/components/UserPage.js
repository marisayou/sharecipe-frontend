import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewRecipeForm from './NewRecipeForm';
import { Container, Grid } from "@material-ui/core";
import ProfileInfo from './ProfileInfo';
import RecipesContainer from './RecipesContainer';
import RecipePage from './RecipePage';

class UserPage extends Component {

    renderPage = () => {
        switch (this.props.userPage) {
            case "form":
                return <NewRecipeForm />
            case "recipe":
                return <RecipePage /> 
            default:
                return (
                    <React.Fragment>
                        <Grid container item xs={12}>
                            <ProfileInfo />
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

// const mapDispatchToProps = dispatch => {
//     return {
//         setUserPage: (page) => dispatch(setUserPage(page))
//     }
// }

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(UserPage)