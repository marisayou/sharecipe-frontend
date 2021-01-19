import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from "@material-ui/core";
import { setUserPage, setCurrentRecipe, deleteRecipe } from '../redux/actions';
import '../css/RecipePage.css';

class RecipePage extends Component {

    renderDescription = () => {
        const paragraphs = this.props.description.split("\n")
        return paragraphs.map((para, idx) => {
            return (
                <Grid container item key={idx}>
                    <p>{para}</p>
                </Grid>
            )
        })
    }

    renderTags = () => {
        return this.props.tags.map(tag => <Button key={tag.name}>{'#' + tag.name}</Button>)
    }

    renderIngredients = () => {
        return this.props.ingredients.map((ing, idx) => {
            const wholeNum = ing.wholeNum === "0" ? "" : `${ing.wholeNum} `
            const fracNum = ing.fracNum === "0" ? "" : `${ing.fracNum} `
            const unit = ing.unit === "none" ? "" : `${ing.unit} `
            const ingredient = ing.ingredient
            return (
                <Grid container item key={idx}>
                    <p>{wholeNum+fracNum+unit+ingredient}</p>
                </Grid>
            )
        })
    }

    renderInstructions = () => {
        const instructions = this.props.instructions.split("\n")
        return instructions.map((ins, idx) => {
            return (
                <Grid container item key={idx}>
                    <p>{ins}</p>
                </Grid>
            )
        })
    }

    handleBackButtonClick = async () => {
        await this.props.setUserPage("profile")
        this.props.setCurrentRecipe(null)
    }

    handleDeleteButtonClick = async () => {
        await this.props.setUserPage("profile")
        this.props.deleteRecipe(this.props.id)
        
    }

    render() {
        console.log(this.props.currentRecipe)
        return (
            <React.Fragment>
                <Grid container item direction="column" xs={10} alignItems="center">
                    <Grid item xs={12}>
                        <h1>{this.props.title}</h1>
                    </Grid>
                    <Grid container item justify="center">
                        <Button variant="outlined" 
                            onClick={this.handleBackButtonClick}
                        >
                            Back
                        </Button>
                    </Grid>
                    <Grid id="tags" item container xs={12}>
                        {this.renderTags()}
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
                    <Grid className="btn-container" container item justify="center">
                        <Button variant="outlined" 
                            onClick={() => this.props.setUserPage("form")}
                        >
                            Edit
                        </Button>
                        <Button variant="outlined" 
                            onClick={this.handleDeleteButtonClick}
                        >
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ currentRecipe }) => {
    const { id, title, description, ingredients, instructions, tags } = currentRecipe
    return { currentRecipe, id, title, description, ingredients, instructions, tags }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserPage: (page) => dispatch(setUserPage(page)),
        setCurrentRecipe: (recipe) => dispatch(setCurrentRecipe(recipe)),
        deleteRecipe: (id) => dispatch(deleteRecipe(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage)