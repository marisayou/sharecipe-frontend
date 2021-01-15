import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {

    componentDidMount() {
        fetch('http://localhost:3000/get_user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(res => res.json())
        .then(user => {
            this.props.handleRefresh(user)
        })
    }

    render() {
        return <div>Welcome, {this.props.name}</div>
    }
}

const mapStateToProps = ({ user, name }) => {
    return { user, name }
}

const mapDispatchToProps = dispatch => {
    return {
        handleRefresh: (user) => dispatch({ type: "UPDATE_USER_INFO", payload: user})
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)