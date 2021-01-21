import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../redux/actions';
import { Container, Grid } from "@material-ui/core";
import RecipesContainer from './RecipesContainer';
import RecipePage from './RecipePage';
import TagPage from './TagPage';

class Home extends Component {

    componentDidMount() {
        this.props.getUser()
    }    

    renderPage = () => {
        switch (this.props.homePage) {
            case "recipe":
                console.log("!!!!!!!!!")
                return <RecipePage /> 
            case "tag":
                return <TagPage />
            default:
                return (
                    <React.Fragment>
                        <Container maxWidth="md">
                            <Grid container direction="column" alignItems="center">
                                <Grid item>
                                    <h1>Welcome, {this.props.user ? this.props.user.name : ""}!</h1>
                                </Grid>
                                <Grid item>
                                    <h3>Here are the newest recipes</h3>
                                </Grid>
                                <RecipesContainer />
                            </Grid>
                        </Container>
                    </React.Fragment>
                )   
        }
    }

    render() {
        console.log(this.props.homePage)
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