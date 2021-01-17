import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewRecipeForm from './NewRecipeForm';
import { Container, Grid, Button } from "@material-ui/core";
import ProfileInfo from './ProfileInfo';
import RecipesContainer from './RecipesContainer'

class UserPage extends Component {
    state = {
        recipeForm: false,
        recipePage: false
    }

    renderRecipeForm = () => this.setState({ recipeForm: true })
    closeRecipeForm = () => this.setState({ recipeForm: false })

    render() {
        return (
            <React.Fragment>
                <Container maxWidth="md">
                    <Grid container direction="column">
                        {this.state.recipeForm ?
                            <NewRecipeForm closeRecipeForm={this.closeRecipeForm}/> :
                            (<React.Fragment>
                                <Grid container item xs={12}>
                                    <ProfileInfo renderRecipeForm={this.renderRecipeForm}/>
                                </Grid>
                                <br />
                                <RecipesContainer />
                            </React.Fragment>)
                        }
                    </Grid>
                </Container>
            </React.Fragment>
        )
        
    }
}

const mapStateToProps = ({ user }) => {
    return { user }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPage)