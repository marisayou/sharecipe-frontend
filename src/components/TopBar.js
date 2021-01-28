import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from './Menu';
import { AppBar, Grid, InputBase, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import '../css/TopBar.css';
import { setSearchTerm, getSearchResults, resetNested } from '../redux/actions';

class TopBar extends Component {

  state = {
    search: ""
  }

  handleSearchOnChange = (e) => {
    this.setState({search: e.target.value})
  }

  handleSearchSubmit = (e) => {
    e.preventDefault()

    if (this.state.search.replace(" ", "") === "") { 
      this.setState({ search: "" })
      return 
    }
    
    this.props.resetNested()
    // const searchTerms = this.state.search.split(" ").filter(w => w !== "")
    this.props.getSearchResults(this.state.search)
    this.props.setSearchTerm(this.state.search)
    this.setState({ search: "" })
    this.props.selectMenuItem("Search")
  }

  renderTopBar = () => {
    if (this.props.screenWidth < 900) {
      return (
        <React.Fragment>
          <Grid item xs={1}>
            <Menu selectMenuItem={this.props.selectMenuItem}/>
          </Grid>
          <Grid item md={1}></Grid>
          {/* <Grid item xs={1} id="search-icon">
            
          </Grid> */}
          <Grid container item id="search-bar-div" direction="row" xs={10} md={8} justify="center">
            <Grid item xs={11} sm={8}>
              <form onSubmit={this.handleSearchSubmit}>
                <InputBase 
                  fullWidth
                  id="search-bar"
                  placeholder="Search…"
                  value={this.state.search}
                  onChange={this.handleSearchOnChange}
                />
                <IconButton type="submit" id="search-button">
                  <SearchIcon />
                </IconButton>
              </form>
              
            </Grid>
          </Grid>
        </React.Fragment>
      ) 
    } else {
      return (
        <React.Fragment>
          <Grid item xs={8}>
            <Menu selectMenuItem={this.props.selectMenuItem}/>
          </Grid>
          <Grid container item id="search-bar-div" direction="row" xs={4} justify="flex-start">
            <Grid item xs={11}>
              <form onSubmit={this.handleSearchSubmit}>
                <InputBase 
                  fullWidth
                  id="search-bar"
                  placeholder="Search…"
                  value={this.state.search}
                  onChange={this.handleSearchOnChange}
                />
                <IconButton type="submit" id="large-screen-search-button">
                  <SearchIcon />
                </IconButton>
              </form>
            </Grid>
          </Grid>
        </React.Fragment>
      )
    }
  }

  render() {
    return (
      <React.Fragment>
        <AppBar position="static" id="appbar">
          <Grid container id="topbar-container">
            {this.renderTopBar()}  
          </Grid>
        </AppBar>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ screenWidth }) => {
  return { screenWidth }
}

const mapDispatchToProps = dispatch => {
  return {
    setSearchTerm: (searchTerm) => dispatch(setSearchTerm(searchTerm)),
    getSearchResults: (searchTerm) => dispatch(getSearchResults(searchTerm)),
    resetNested: () => dispatch(resetNested())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)