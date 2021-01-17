import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button, Card, CardHeader, CardContent, CardActions, Typography, IconButton } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';

class RecipePreview extends Component {

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
                        <IconButton>
                            <EditIcon />
                        </IconButton>
                        <Button size="small">Read More</Button>
                    </CardActions>
                </Card>
            </Grid>
        )
    }
}

export default connect()(RecipePreview)