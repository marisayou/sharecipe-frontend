import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserPage, setCurrentRecipe, addNewRecipe, editRecipe } from '../redux/actions';
import { Button, Grid, TextField, MenuItem } from "@material-ui/core";
import '../css/UserForm.css';
import '../css/RecipeForm.css';

class RecipeForm extends Component {
    state = {
        title: "",
        description: "",
        ingredients: [
            { ingredient: "", wholeNum: "", fracNum: "", unit: "" } 
        ],
        instructions: "",
        tags: []
    }

    componentDidMount() {
        const recipe = this.props.currentRecipe
        if (recipe) {
            let tags = ""
            recipe.tags.forEach((tag, idx) => {
                idx === tags.length-1 ? tags += tag.name : tags += tag.name + " "
            })
            const { title, description, ingredients, instructions } = recipe
            this.setState({ title, description, ingredients, instructions, tags });
        }
    }

    handleCancelButtonClick = async () => {
        if (this.props.currentRecipe) {
            this.props.setUserPage("recipe")
        } else {
            await this.props.setUserPage("profile")
            this.props.setCurrentRecipe(null)
        }
        
    }

    handleRecipeFormSubmit = async (e) => {
        e.preventDefault()
        const { title, description, ingredients, instructions } = this.state
        const recipe = { title, description, ingredients, instructions }
        const tags = this.state.tags.split(" ").filter(tag => tag !== "")
        
        if (this.props.currentRecipe) {
            await this.props.editRecipe(recipe, tags, this.props.currentRecipe.id)
            this.props.setUserPage("recipe")
        } else {
            await this.props.addNewRecipe(recipe, tags, this.props.user.id)
            this.props.setUserPage("profile")
        }
    }

    ingredientFields = () => {
        const ingredients = [...this.state.ingredients]
        const qtyWholeNums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"]
        const qtyFractions = ["0", "1/8", "1/4", "1/3", "3/8", "1/2", "5/8", "2/3", "3/4", "7/8"]
        const units = ["none", "tsp", "tbsp", "fl oz", "c", "pt", "qt", "gal", "ml", "l", "lb", "oz", "mg", "g", "kg"]
        return ingredients.map((ing, idx) => {
            return (
                <Grid key={idx} container item direction="row" xs={12} md={6} justify="center">
                    <Grid item className="textfield">
                    <TextField 
                        className="qty-input" 
                        select 
                        label="Qty" 
                        value={ing.wholeNum} 
                        onChange={(e) => this.handleIngredientFieldChange(e, idx, "wholeNum")} 
                        required
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
                        required
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
                        required
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
                        required
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
                                    label="Tags" 
                                    value={this.state.tags} 
                                    helperText="eg. dessert cake yummy"
                                    onChange={(e) => this.handleFormChange(e, "tags")}
                                    required
                                />
                            </Grid>

                            <Grid className="btn-container" container item justify="center">
                                <Grid item className="btn-div">
                                    <Button className="recipe-form-btn" variant="outlined" onClick={this.handleCancelButtonClick}>Cancel</Button>
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

const mapStateToProps = ({ user, recipes, currentRecipe }) => {
    return { user, recipes, currentRecipe }
}

const mapDispatchToProps = dispatch => {
    return {
        addNewRecipe: (recipe, tags, userId) => dispatch(addNewRecipe(recipe, tags, userId)),
        setUserPage: (page) => dispatch(setUserPage(page)),
        setCurrentRecipe: (recipe) => dispatch(setCurrentRecipe(recipe)),
        editRecipe: (recipe, tags, recipeId) => dispatch(editRecipe(recipe, tags, recipeId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeForm)