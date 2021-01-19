import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { updateUserInfo, logout, setMenuPage, setUserPage } from './redux/actions.js';
import UserForm from './components/UserForm';
import Home from './components/Home';
import UserPage from './components/UserPage';
import FavoritesPage from './components/FavoritesPage';
import AllRecipesPage from './components/AllRecipesPage';
import TopBar from './components/TopBar';
import './App.css';

class App extends Component {

  state = { page: null }

  selectMenuItem = (menuItem) => {
    switch (menuItem) {
        case "Settings":
          this.setState({ page: null }, () => this.props.history.push('/settings'))
          return
        case "Logout":
          
          this.setState({ page: null }, () => this.props.logout())
          localStorage.clear()
          return
        default:
          this.setState({ page: menuItem }, () => this.props.history.push('/home'))
          return
    }
  }

  renderPage = () => {
    switch (this.state.page) {
      case "Profile Page": 
        this.props.setMenuPage("profile")
        this.props.setUserPage("profile")
        return <UserPage />
      case "Favorites":
        this.props.setMenuPage("favorites")
        return <FavoritesPage />
      case "Recipes":
        this.props.setMenuPage("recipes")
        return <AllRecipesPage />
      default:
        this.props.setMenuPage("home")
        return <Home />
    }
  }

  renderForm = (formType) => {
    return <UserForm handleSubmit={this.handleSubmit} form={formType}/>
  }

  handleSubmit = (formType, data) => {
    switch (formType) {
      case "Sign In":
        this.handleAuthFetch(data, "http://localhost:3000/login", "POST")
        return
      case "Sign Up":
        this.handleAuthFetch(data, "http://localhost:3000/users", "POST")
        return
      case "Settings":
        this.handleAuthFetch(data, `http://localhost:3000/users/${this.props.user.id}`, "PATCH")
        return
      default:
        return
    }
  }

  handleAuthFetch = (data, request, method) => {
    fetch(request, {
      method: method,
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin" : "*", 
        "Access-Control-Allow-Credentials" : true  
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) { 
        alert(data.error) 
        return 
      } 
      else {
        return this.props.updateUserInfo(data)
      }
    })
    .then(action => {
      if (action && action.payload) {
        action.payload.token ? 
          localStorage.setItem('jwt', action.payload.token) : 
          alert("Account successfully updated.")
        this.props.history.push('/home')
      }
    })

  }

  render() {
    return (
      <div className="App">
        {this.props.user ? <TopBar selectMenuItem={this.selectMenuItem}/> : null}
        <Switch>

          <Route exact path="/">
            {!!localStorage.getItem('jwt') ? <Redirect to="/home" /> : <Route path="/" exact component={() => this.renderForm("Sign In")} />}
          </Route>

          <Route exact path="/signup">
            {!!localStorage.getItem('jwt') ? <Redirect to="/home" /> : <Route path="/signup" exact component={() => this.renderForm("Sign Up")} /> }
          </Route>

          <Route exact path="/settings">
            {!!localStorage.getItem('jwt') ? <Route path="/settings" exact component={() => this.renderForm("Settings")} /> : <Redirect to="/" />}
          </Route>

          <Route exact path="/home">
            {!!localStorage.getItem('jwt') ? <Route path="/home" exact component={this.renderPage}/> : <Redirect to="/" />}
          </Route>

        </Switch>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return { user }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUserInfo: (info) => dispatch(updateUserInfo(info)),
    logout: () => dispatch(logout()),
    setMenuPage: (page) => dispatch(setMenuPage(page)),
    setUserPage: (page) => dispatch(setUserPage(page))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
