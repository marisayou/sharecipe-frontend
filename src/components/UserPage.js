import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserPage extends Component {

    // componentDidMount() {
    //     fetch('http://localhost:3000/get_user', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(user => {
    //         this.props.handleRefresh(user)
    //     })
    // }

    render() {
        return <div>{this.props.user.name}'s Page</div>
    }
}

const mapStateToProps = ({ user }) => {
    return { user }
}

const mapDispatchToProps = dispatch => {
    return {
        handleRefresh: (user) => dispatch({ type: "UPDATE_USER_INFO", payload: user})
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPage)