import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from "@material-ui/core";
import { getSearchTags, setSearchPage, setCurrentTag } from '../redux/actions';
import '../css/SearchResults.css'

class SearchTags extends Component {

    renderTags = () => {
        const tags = this.props.searchTags.map(tag => {
            return (
                <Grid className="search-tag-buttons" item key={tag.name}>
                    <Button  onClick={() => this.handleTagClick(tag.name)}>#{tag.name}</Button>
                </Grid>
            )
        })
        
        return tags.length === 0 ?
            (
                <Grid item className="no-results"><p>No matches found for "{this.props.searchTerm}"</p></Grid>
            ) :
            tags
    }

    handleTagClick = async (tagName) => {
        await this.props.setCurrentTag(tagName)
        this.props.setSearchPage("tag")
    }

    render() {
        return (
            <Grid container item direction="row" alignItems="flex-end">
                <Grid item>
                    <h3 id="tags-header">Tags:</h3>
                </Grid>
                {this.renderTags()}
            </Grid>
        )
    }
}

const mapStateToProps = ({ searchTags, searchTerm }) => {
    return { searchTags, searchTerm }
}

const mapDispatchToProps = dispatch => {
    return { 
        getSearchTags: (searchTerm) => dispatch(getSearchTags(searchTerm)),
        setSearchPage: (page) => dispatch(setSearchPage(page)),
        setCurrentTag: (tagName) => dispatch(setCurrentTag(tagName))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(SearchTags)
