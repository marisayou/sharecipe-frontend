import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNewRecipe } from '../redux/actions';
import { Button, Grid, TextField, MenuItem } from "@material-ui/core";
import { setUserPage } from '../redux/actions';
import '../css/UserForm.css';
import '../css/NewRecipeForm.css';

class NewRecipeForm extends Component {
    state = {
        title: "",
        description: "",
        ingredients: [
            { ingredient: "", wholeNum: "", fracNum: "", unit: "" } 
        ],
        instructions: "",
        tags: ""
    }

    handleRecipeFormSubmit = async (e) => {
        e.preventDefault()
        const recipe = {
            title: this.state.title,
            description: this.state.description,
            ingredients: this.state.ingredients,
            instructions: this.state.instructions
        }
        const tags = this.state.tags.split(" ")
        
        await this.props.addNewRecipe(recipe, this.props.user.id)
        // await this.createTags(tags)
        this.props.setUserPage("profile")
    }

    // createTags = async (tags) => {
    //     tags.map(tag => {
    //         await fetch("http://localhost:3000/tags", {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json'
    //             },
    //             body: JSON.stringify({ name: tag })
    //         })
    //     })
    // }

    ingredientFields = () => {
        const ingredients = [...this.state.ingredients]
        const qtyWholeNums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"]
        const qtyFractions = ["0", "1/8", "1/4", "1/3", "3/8", "1/2", "5/8", "2/3", "3/4", "7/8"]
        const units = ["none", "tsp", "tbsp", "fl oz", "c", "pt", "qt", "gal", "ml", "l", "lb", "oz", "mg", "g", "kg"]
        return ingredients.map((ing, idx) => {
            return (
                <Grid container item direction="row" xs={12} sm={6} md={4} justify="center">
                    <Grid item className="textfield">
                    <TextField 
                        className="qty-input" 
                        select 
                        label="Qty" 
                        value={ing.wholeNum} 
                        onChange={(e) => this.handleIngredientFieldChange(e, idx, "wholeNum")} 
                    >
                        {qtyWholeNums.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField 
                        className="qty-input" 
                        select 
                        label="Qty" 
                        value={ing.fracNum} 
                        onChange={(e) => this.handleIngredientFieldChange(e, idx, "fracNum")} 
                    >
                        {qtyFractions.map(option => (
                            <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                        ))}
                    </TextField>
                    <TextField 
                        className="qty-input" 
                        select 
                        label="Unit" 
                        value={ing.unit} 
                        onChange={(e) => this.handleIngredientFieldChange(e, idx, "unit")} 
                    >
                        {units.map(option => (
                            <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                        ))}
                    </TextField>
                    <TextField 
                        className="ingredient-input"
                        label="Ingredient" 
                        value={ing.ingredient} 
                        onChange={(e) => this.handleIngredientFieldChange(e, idx, "ingredient")} 
                    />
                    <Button 
                        className="remove-ingredient" 
                        onClick={() => this.removeIngredient(idx)} 
                        disabled={this.state.ingredients.length === 1}
                    >
                        Delete
                    </Button>
                    </Grid>
                </Grid>
            )
        })
    }

    handleIngredientFieldChange = (e, idx, inputField) => {
        this.setState(prevState => {
            let newIngredients = [...prevState.ingredients]
            newIngredients[idx][inputField] = e.target.value
            return { ingredients: newIngredients }
        })
    }

    addIngredientField = () => {
        const newIngredientField = { ingredient: "", wholeNum: "", fracNum: "", unit: "" } 
        this.setState(prevState => { 
            return { ingredients: [...prevState.ingredients, newIngredientField]}
        })
    }

    removeIngredient = (idx) => {
        this.setState(prevState => {
            let updatedIngredients = [...prevState.ingredients]
            updatedIngredients.splice(idx, 1)
            return { ingredients: updatedIngredients }
        })
    }

    handleFormChange = (e, inputField) => {
        this.setState({ [inputField]: e.target.value })
    }

    render() {
        return (
            <React.Fragment>
                <Grid container item direction="column" justify="center" alignItems="center">
                    <Grid item xs={12}>
                        <h1>New Recipe</h1>
                    </Grid>
                    <form onSubmit={this.handleRecipeFormSubmit}>
                        <Grid container item xs={12} direction="column" justify="center" alignItems="center" >
                            <Grid container item direction="row" xs={12} justify="center">
                                <TextField
                                    className="textfield" 
                                    label="Title" 
                                    value={this.state.title} 
                                    onChange={(e) => this.handleFormChange(e, "title")}
                                    required 
                                />
                            </Grid>
                            <br />
                            <Grid container item direction="row" xs={12} justify="center">
                                <TextField 
                                    className="textfield" 
                                    variant="outlined"
                                    label="Description" 
                                    value={this.state.description} 
                                    onChange={(e) => this.handleFormChange(e, "description")} 
                                    multiline 
                                    rows={3} 
                                    required 
                                />
                            </Grid>
                            <br />
                            <Grid container item direction="row" xs={12} justify="center">
                                {this.ingredientFields()}
                            </Grid>
                            <Grid item xs={12}>
                                <Button 
                                    id="add-ingredient-btn"
                                    variant="outlined"
                                    onClick={this.addIngredientField} 
                                    disabled={this.state.ingredients.length === 0 ? false : 
                                        !this.state.ingredients[this.state.ingredients.length-1].ingredient ||
                                        !this.state.ingredients[this.state.ingredients.length-1].wholeNum||
                                        !this.state.ingredients[this.state.ingredients.length-1].fracNum||
                                        !this.state.ingredients[this.state.ingredients.length-1].unit}
                                >
                                    Add Ingredient
                                </Button>
                            </Grid>
                            <br />
                            <Grid container item direction="row" xs={12} justify="center">
                                <TextField 
                                    className="textfield" 
                                    variant="outlined"
                                    label="Instructions" 
                                    value={this.state.instructions} 
                                    onChange={(e) => this.handleFormChange(e, "instructions")} 
                                    multiline 
                                    rows={5} 
                                    required 
                                />
                            </Grid>
                            <br />  
                            <Grid container item direction="row" xs={12} justify="center">
                                <TextField
                                    className="textfield" 
                                    variant="outlined"
                                    label="Tags" 
                                    value={this.state.tags} 
                                    onChange={(e) => this.handleFormChange(e, "tags")}
                                />
                            </Grid>

                            <Grid className="btn-container" container item justify="center">
                                <Grid item className="btn-div">
                                    <Button className="recipe-form-btn" variant="outlined" onClick={() => this.props.setUserPage("profile")}>Back</Button>
                                </Grid>
                                <Grid item className="btn-div">
                                    <Button className="recipe-form-btn" type="submit" variant="outlined">Submit</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ user }) => {
    return { user }
}

const mapDispatchToProps = dispatch => {
    return {
        addNewRecipe: (recipe, userId) => dispatch(addNewRecipe(recipe, userId)),
        setUserPage: (page) => dispatch(setUserPage(page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRecipeForm)