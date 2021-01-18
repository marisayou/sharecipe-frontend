import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Card, CardHeader, CardContent, CardActions, Typography, IconButton } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { setCurrentRecipe, setUserPage } from '../redux/actions';

class RecipePreview extends Component {

    handleClickReadMore = async () => {
        await this.props.setCurrentRecipe(this.props.recipe)
        console.log(this.props.recipe)
        console.log(this.props.currentRecipe)
        this.props.setUserPage("recipe")
    }

    render() {
        
        return (
            <Grid container item xs={12} direction="column">
                <Card variant="outlined">
                    <CardHeader title={this.props.recipe.title} />
                    <CardContent>
                        <Typography variant="body2" component="p">
                            {this.props.recipe.description}
                        </Typography>
                    </CardContent>
                    <CardActions >
                        <IconButton>
                            <FavoriteIcon />
                        </IconButton>
                        <Button size="small" onClick={this.handleClickReadMore}>Read More</Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    }
}

const mapStateToProps = ({ currentRecipe }) => {
    return { currentRecipe}
}

const mapDispatchToProps = dispatch => {
    return { 
        setCurrentRecipe: (recipe) => dispatch(setCurrentRecipe(recipe)),
        setUserPage: (page) => dispatch(setUserPage(page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipePreview)

