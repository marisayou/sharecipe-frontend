import React, { Component } from "react";
import { connect } from 'react-redux';
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
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
        {["Home", "Profile Page", "Favorites", "Recipes"].map((text) => (
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

  render() {
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
}

const mapStateToProps = ({ user }) => {
  return { user }
}

export default connect(mapStateToProps)(Menu)