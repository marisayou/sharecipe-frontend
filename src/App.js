import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import UserForm from './components/UserForm';
import Home from './components/Home';
import UserPage from './components/UserPage';
import FavoritesPage from './components/FavoritesPage';
import RecipesPage from './components/RecipesPage';
import UsersPage from './components/UsersPage';
import TopBar from './components/TopBar';
import './App.css';

class App extends Component {
  renderPage = (page) => {
    switch (page) {
        case "Home":
          this.props.history.push('/home')
          return
        case "My Sharecipe Page": 
          return <UserPage />
        case "Favorites":
          return <FavoritesPage />
        case "Recipes":
          return <RecipesPage />
        case "Users":
          return <UsersPage />
        case "Settings":
          this.props.history.push('/settings')
          return
        case "Logout":
          return <div>Logout</div>
          // this.props.updateUserInfo()
          // this.props.history.push('/')
          // return
        default:
          console.log("default")
          return
    }
  }

  renderForm = (formType) => {
    if (formType !== "Settings") { this.props.renderPage(formType) }
    return <UserForm handleSubmit={this.handleSubmit}/>
  }

  handleSubmit = (data) => {
    switch (this.props.page) {
      case "Sign In":
        this.handleAuthFetch(data, "http://localhost:3000/login", "POST")
        return
      case "Sign Up":
        console.log(data)
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
    console.log(data);
    console.log(request);
    console.log(method);
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
      console.log(data)
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
        if (action.payload.token) {
          localStorage.setItem('jwt', action.payload.token)
          this.props.history.push('/home')
        } else {
          alert("Account successfully updated.")
          this.props.history.push('/home')
        }
      }
    })

  }

  renderHome = () => {
    return <Home />
  }

  render() {
    // const userPath = "/" + this.props.username
    return (
      <div className="App">
        <TopBar renderPage={this.renderPage}/>
        <Switch>

          <Route exact path="/">
            <Route path="/" exact component={() => this.renderForm("Sign In")} />
          </Route>

          <Route exact path="/signup">
            <Route path="/signup" exact component={() => this.renderForm("Sign Up")} />
          </Route>

          <Route exact path="/settings">
            <Route path="/settings" exact component={() => this.renderForm("Settings")} />
          </Route>

          <Route exact path="/home">
            {/* <Home path="/home" exact component={<Home />}/> */}
            {!!localStorage.getItem('jwt') ? <Route path="/home" exact component={this.renderHome}/> : <Redirect to="/" />}
          </Route>

        </Switch>
      </div>
    )
  }
}

const mapStateToProps = ({ page, user }) => {
  return { page, user }
}

const mapDispatchToProps = dispatch => {
  return {
    renderPage: (page) => dispatch({ type: "RENDER_PAGE", payload: page }),
    updateUserInfo: (userInfo) => dispatch({ type: "UPDATE_USER_INFO", payload: userInfo })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
