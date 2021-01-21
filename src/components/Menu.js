import React, { Component } from "react";
import { connect } from 'react-redux';
import { Toolbar, Grid, Drawer, Button, List, Divider, ListItem, ListItemText } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

class Menu extends Component {
  state = {
    menu: false
  }

  toggleDrawer = (open) => {
    this.setState({ menu: open })
  };

  list = () => (
    <div
      id="menu"
      role="presentation"
      onClick={() => this.toggleDrawer(false)}
      onKeyDown={() => this.toggleDrawer(false)}
    >
      <List>
        {["Home", "Profile", "Favorites", "Recipes"].map((text) => (
          <ListItem button key={text} 
            onClick={() => {
              this.props.selectMenuItem(text)
            }}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}    
      </List>
      <Divider />
      <List>
        {["Settings", "Logout"].map((text) => (
          <ListItem button key={text} onClick={() => { this.props.selectMenuItem(text) }}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  
  smallScreenMenu = () => {
    return (
      <React.Fragment key={"left"}>
        <Button onClick={() => this.toggleDrawer(true)} id="menu-btn"><MenuIcon /></Button>
        <Drawer
          anchor={"left"}
          open={this.state.menu}
          onClose={() => this.toggleDrawer(false)}
        >
          {this.list("left")}
        </Drawer>
      </React.Fragment>

    )
  }

  largeScreenMenu = () => {
    return (
      <Toolbar>
        <Grid container item direction="row">
          {["Home", "Profile", "Favorites", "Recipes", "Settings", "Logout"].map((text) => (
            <Button key={text} onClick={() => {this.props.selectMenuItem(text)}}>{text}</Button>
          ))}
        </Grid>
      </Toolbar>
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.props.screenWidth < 900 ? this.smallScreenMenu() : this.largeScreenMenu()}
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ user, screenWidth }) => {
  return { user, screenWidth }
}

export default connect(mapStateToProps)(Menu)