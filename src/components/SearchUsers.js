import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from "@material-ui/core";
import { setCurrentUser, setMenuPage } from '../redux/actions';
import '../css/SearchResults.css'

class SearchUsers extends Component {

    renderUsers = () => {
        const users = this.props.searchUsers.map(user => {
            return (
                <Grid className="search-result-buttons" item key={user.username}>
                    <Button  onClick={() => this.handleUsernameClick(user.id)}>{user.username}</Button>
                </Grid>
            )
        })
        
        return users.length === 0 ?
            (
                <Grid item className="no-results"><p>No matches found for "{this.props.searchTerm}"</p></Grid>
            ) :
            users
    }

    handleUsernameClick = (userId) => {
        if (userId === this.props.user.id) {
            console.log("profile")
            this.props.setCurrentUser(userId, "profile")
            this.props.setMenuPage("profile")

        }
        else {
            this.props.setCurrentUser(userId, "search")
        }
    }

    render() {
        console.log("search")
        return (
            <Grid container item direction="row" alignItems="flex-end">
                <Grid item xs={12}>
                    <h3 className="search-header">Users</h3>
                </Grid>
                {this.renderUsers()}
            </Grid>
        )
    }
}

const mapStateToProps = ({ user, searchUsers, searchTerm }) => {
    return { user, searchUsers, searchTerm }
}

const mapDispatchToProps = dispatch => {
    return { 
        setCurrentUser: (userId, menuPage) => dispatch(setCurrentUser(userId, menuPage)),
        setMenuPage: (page) => dispatch(setMenuPage(page))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsers)
