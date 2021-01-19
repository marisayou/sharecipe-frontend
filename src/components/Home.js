import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../redux/actions';

class Home extends Component {

    componentDidMount() {
        this.props.getUser()
    }

    render() {
        return <div>Welcome, {this.props.user ? this.props.user.name : ""}</div>
    }
}

const mapStateToProps = ({ user }) => {
    return { user }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: () => dispatch(getUser())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)