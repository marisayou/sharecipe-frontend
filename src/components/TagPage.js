import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import RecipesContainer from './RecipesContainer';

class TagPage extends Component {

    render() {
        console.log(this.props.currentTag)
        return (
            <React.Fragment>
                <Grid item>
                    <h1>#{this.props.currentTag}</h1>
                </Grid>
                <RecipesContainer/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ currentTag }) => {
    return { currentTag }
}
export default connect(mapStateToProps)(TagPage)