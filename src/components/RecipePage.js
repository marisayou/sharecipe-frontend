import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from "@material-ui/core";
import { setUserPage } from '../redux/actions';
import '../css/RecipePage.css';

class RecipePage extends Component {

    renderDescription = () => {
        const paragraphs = this.props.description.split("\n")
        return paragraphs.map(para => {
            return (
                <Grid container item >
                    <p>{para}</p>
                </Grid>
            )
        })
    }

    renderIngredients = () => {
        return this.props.ingredients.map(ing => {
            const wholeNum = ing.wholeNum === "0" ? "" : `${ing.wholeNum} `
            const fracNum = ing.fracNum === "0" ? "" : `${ing.fracNum} `
            const unit = ing.unit === "none" ? "" : `${ing.unit} `
            const ingredient = ing.ingredient
            return (
                <Grid container item >
                    <p>{wholeNum+fracNum+unit+ingredient}</p>
                </Grid>
            )
        })
    }

    renderInstructions = () => {
        const instructions = this.props.instructions.split("\n")
        return instructions.map(ins => {
            return (
                <Grid container item >
                    <p>{ins}</p>
                </Grid>
            )
        })
    }

    render() {
        console.log(this.props.instructions)
        return (
            <React.Fragment>
                <Grid container item direction="column" xs={10} alignItems="center">
                    <Grid item>
                        <h1>{this.props.title}</h1>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" onClick={() => this.props.setUserPage("profile")}>Back</Button>
                    </Grid>
                    <Grid id="description" item container xs={12}>
                        {this.renderDescription()}
                    </Grid>
                    <br/>
                    <Grid id="ingredients-instructions" container item xs={12}>
                        <Grid item>
                            <h3>Ingredients</h3>
                        </Grid>
                        {this.renderIngredients()}
                        <br/>
                        <Grid item>
                            <h3>Instructions</h3>
                        </Grid>
                        <Grid container item>
                            {this.renderInstructions()}
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ currentRecipe }) => {
    const { title, description, ingredients, instructions } = currentRecipe
    return { title, description, ingredients, instructions }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserPage: (page) => dispatch(setUserPage(page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage)