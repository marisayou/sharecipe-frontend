import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { 
  resizeScreen, 
  updateUserInfo, 
  logout, 
  setMenuPage, 
  setHomePage,
  setUserPage, 
  setRecipesPage, 
  setFavoritesPage,
  setSubscriptionsPage, 
  setSearchPage,
  setCurrentUser
} from './redux/actions.js';
import UserForm from './components/UserForm';
import Home from './components/Home';
import ProfilePage from './components/ProfilePage';
import FavoritesPage from './components/FavoritesPage';
import SubscriptionsPage from './components/SubscriptionsPage';
import AllRecipesPage from './components/AllRecipesPage';
import TopBar from './components/TopBar';
import SearchResults from './components/SearchResults';
import './App.css';

class App extends Component {

  state = { route: null }

  componentDidMount() {
    window.addEventListener("resize", () => this.props.resizeScreen(document.body.clientWidth))
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.props.resizeScreen(document.body.clientWidth))
  }

  signIn = (signIn) => {
    signIn ? 
      this.props.history.push('/') :
      this.props.history.push('/signup')
  }

  selectMenuItem = (menuItem) => {
    switch (menuItem) {
        case "Settings":
          this.setState({ route: null }, () => this.props.history.push('/settings'))
          return
        case "Logout":
          this.setState({ route: null }, () => this.props.logout())
          localStorage.clear()
          return
        default:
          this.setState({ route: menuItem }, () => this.props.history.push('/home'))
          return
    }
  }

  renderPage = () => {
    switch (this.state.route) {
      case "Profile": 
        if (this.props.nested.pageStack.length === 0){
          this.props.setCurrentUser(this.props.user.id, "profileDefault")
        }
        this.props.setMenuPage("profile")
        return <ProfilePage selectMenuItem={this.selectMenuItem}/>
      case "Favorites":
        this.props.setMenuPage("favorites")
        if (this.props.nested.pageStack.length === 0) {
          this.props.setFavoritesPage("default")
        }
        return <FavoritesPage />
      case "Subscriptions":
        this.props.setMenuPage("subscriptions")
        if (this.props.nested.pageStack.length === 0) {
          this.props.setSubscriptionsPage("default")
        }
        return <SubscriptionsPage />
      case "Browse Recipes":
        this.props.setMenuPage("recipes")
        if (this.props.nested.pageStack.length === 0) {
          this.props.setRecipesPage("default")
        }
        return <AllRecipesPage />
      case "Search":
        this.props.setMenuPage("search")
        if (this.props.nested.pageStack.length === 0) {
          this.props.setSearchPage("default")
        }
        return <SearchResults />
      default:
        console.log("default")
        this.props.setMenuPage("home")
        if (this.props.nested.pageStack.length === 0) {
          this.props.setHomePage("default")
        }
        return <Home />
    }
  }

  renderForm = (formType) => {
    return <UserForm 
      handleSubmit={this.handleSubmit} 
      form={formType} 
      signIn={this.signIn} 
      selectMenuItem={this.selectMenuItem}
    />
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
        "Accept": "application/json"
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
        console.log(data)
        return this.props.updateUserInfo(data)
      }
    })
    .then(action => {
      if (action && action.payload) {
        action.payload.token ? 
          // sign up or sign in
          localStorage.setItem('jwt', action.payload.token) : 
          // update user in settings
          alert("Account successfully updated.")
        this.props.history.push('/home')
      }
    })

  }

  render() {
    console.log(this.props.nested)
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

const mapStateToProps = ({ user, nested }) => {
  return { user, nested }
}

const mapDispatchToProps = dispatch => {
  return {
    resizeScreen: (pageWidth) => dispatch(resizeScreen(pageWidth)),
    updateUserInfo: (info) => dispatch(updateUserInfo(info)),
    logout: () => dispatch(logout()),
    setMenuPage: (page) => dispatch(setMenuPage(page)),
    setHomePage: (page) => dispatch(setHomePage(page)),
    setUserPage: (page) => dispatch(setUserPage(page)),
    setRecipesPage: (page) => dispatch(setRecipesPage(page)),
    setFavoritesPage: (page) => dispatch(setFavoritesPage(page)),
    setSubscriptionsPage: (page) => dispatch(setSubscriptionsPage(page)),
    setSearchPage: (page) => dispatch(setSearchPage(page)),
    setCurrentUser: (userId, page) => dispatch(setCurrentUser(userId, page))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
