import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    
    // const user = useSelector(state => state.user)
    // const state = useSelector(state => state)
    // console.log(state)
    // return <div>Welcome, {user.name}</div>

    render() {
        console.log("yo")
        return <div>Welcome, {this.props.name}</div>
    }
}

const mapStateToProps = ({ user, name }) => {
    return { user, name }
}

// const mapDispatchToProps = dispatch => {
//     return {

//     }
// }

export default connect(
    mapStateToProps
    // mapDispatchToProps
)(Home)