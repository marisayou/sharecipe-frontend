import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../redux/actions';
import { Container, Grid } from "@material-ui/core";
import RecipesContainer from './RecipesContainer';
import RecipePage from './RecipePage';
import TagPage from './TagPage';
import UserPage from './UserPage';

class Home extends Component {

    componentDidMount() {
        this.props.getUser()
    }    

    renderPage = () => {
        console.log(this.props.homePage)
        switch (this.props.homePage) {
            case "recipe":
                return <RecipePage /> 
            case "tag":
                return <TagPage />
            case "user":
                return <UserPage />
            default:
                return (
                    <React.Fragment>
                        <Grid container direction="column" alignItems="center">
                            <Grid item>
                                <h1>Welcome, {this.props.user ? this.props.user.name : null}!</h1>
                            </Grid>
                            <Grid item>
                                <h3>This week's featured recipes</h3>
                            </Grid>
                            <Grid container item xs={12} md={9} justify="center">
                                <RecipesContainer />
                            </Grid>
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

const mapStateToProps = ({ user, homePage }) => {
    return { user, homePage }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: () => dispatch(getUser())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)