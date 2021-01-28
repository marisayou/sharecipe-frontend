import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, IconButton } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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

    handleBackButtonClick = async () => {
        if (this.props.nested.pageStack.length > 0) {
            const prevPage = this.props.nested.pageStack[0]
            await this.props.popNestedPage()

            switch (prevPage) {
                case 'recipe':
                    
                    const prevRecipe = this.props.nested.recipeStack[0]
                    await this.props.popNestedRecipe()
                    await this.props.setCurrentRecipe(prevRecipe)

                    switch(this.props.menuPage) {
                        case "home":
                            await this.props.setHomePage("recipe")
                            break
                        case "profile":
                            await this.props.setUserPage("recipe")
                            break
                        case "recipes":
                            await this.props.setRecipesPage("recipe")
                            break
                        case "favorites":
                            console.log("!!!!!!")
                            await this.props.setFavoritesPage("recipe")
                            break
                        case "subscriptions":
                            await this.props.setSubscriptionsPage("recipe")
                            break
                        case "search":
                            await this.props.setSearchPage("recipe")
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
                    await this.props.setHomePage("default")
                    break
                case "profile":
                    await this.props.setUserPage("default")
                    break
                case "recipes":
                    await this.props.setRecipesPage("default")
                    break
                case "favorites":
                    await this.props.setFavoritesPage("default")
                    break
                case "subscriptions":
                    await this.props.setSubscriptionsPage("default")
                    break
                case "search":
                    await this.props.setSearchPage("default")
                    break
                default:
                    return
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <Grid container item xs={12} md={9}>
                    <Grid item className="back-btn" xs={1}>
                        <IconButton onClick={this.handleBackButtonClick}>
                            <ArrowBackIcon fontSize="large"/>
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <h1>#{this.props.currentTag}</h1>
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