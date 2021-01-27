import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from "@material-ui/core";
import RecipesContainer from './RecipesContainer';
import {
    setHomePage,
    setUserPage,
    setRecipesPage,
    setFavoritesPage,
    setSubscriptionsPage,
    setSearchPage,
    popNestedPage,
    popNestedRecipe,
    setCurrentRecipe
} from '../redux/actions';

class TagPage extends Component {

    handleBackButtonClick = () => {
        console.log(this.props)
        if (this.props.nested.pageStack.length > 0) {
            const prevPage = this.props.nested.pageStack[0]
            this.props.popNestedPage()

            switch (prevPage) {
                case 'recipe':
                    const prevRecipe = this.props.nested.recipeStack[0]
                    this.props.popNestedRecipe()
                    this.props.setCurrentRecipe(prevRecipe)

                    switch(this.props.menuPage) {
                        case "home":
                            this.props.setHomePage("recipe")
                            break
                        case "profile":
                            this.props.setUserPage("recipe")
                            break
                        case "recipes":
                            this.props.setRecipesPage("recipe")
                            break
                        case "favorites":
                            this.props.setFavoritesPage("recipe")
                            break
                        case "subscriptions":
                            this.props.setSubscriptionsPage("recipe")
                            break
                        case "search":
                            this.props.setSearchPage("recipe")
                            break
                        default:
                            return
                    }
                    break
                default:
                    return
            }
        } else {
            switch(this.props.menuPage) {
                case "home":
                    this.props.setHomePage("default")
                    break
                case "profile":
                    this.props.setUserPage("default")
                    break
                case "recipes":
                    this.props.setRecipesPage("default")
                    break
                case "favorites":
                    this.props.setFavoritesPage("default")
                    break
                case "subscriptions":
                    this.props.setSubscriptionsPage("default")
                    break
                case "search":
                    this.props.setSearchPage("default")
                    break
                default:
                    return
            }
        }
    }

    render() {
        console.log(this.props.currentTag)
        return (
            <React.Fragment>
                <Grid item>
                    <h1>#{this.props.currentTag}</h1>
                </Grid>
                <Grid item>
                    <Button variant="outlined" onClick={this.handleBackButtonClick}>
                        Back to {this.props.menuPage}
                    </Button>
                </Grid>
                <br />
                <RecipesContainer/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ currentTag, menuPage, nested }) => {
    return { currentTag, menuPage, nested }
}

const mapDispatchToProps = dispatch => {
    return {
        setHomePage: (page) => dispatch(setHomePage(page)),
        setUserPage: (page) => dispatch(setUserPage(page)),
        setRecipesPage: (page) => dispatch(setRecipesPage(page)),
        setFavoritesPage: (page) => dispatch(setFavoritesPage(page)),
        setSubscriptionsPage: (page) => dispatch(setSubscriptionsPage(page)),
        setSearchPage: (page) => dispatch(setSearchPage(page)),
        popNestedPage: () => dispatch(popNestedPage()),
        popNestedRecipe: () => dispatch(popNestedRecipe()),
        setCurrentRecipe: (recipe) => dispatch(setCurrentRecipe(recipe))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TagPage)