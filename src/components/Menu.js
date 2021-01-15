import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from '@material-ui/icons/Menu';

const Menu = (props) => {
  const openMenu = useSelector(state => state.openMenu)
  const dispatch = useDispatch()

  const toggleDrawer = (open) => () => {
    dispatch({type: "TOGGLE_MENU", payload: open})
  };

  const list = () => (
    <div
      id="menu"
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["Home", "My Sharecipe Page", "Favorites", "Recipes", "Users"].map((text, index) => (
          <ListItem button key={text} 
            onClick={() => {
              props.selectMenuItem(text)
            }}
          >
            {/* <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon> */}
            <ListItemText primary={text} />
          </ListItem>
        ))}    
      </List>
      <Divider />
      <List>
        {["Settings", "Logout"].map((text, index) => (
          <ListItem button key={text} onClick={() => { props.selectMenuItem(text) }}>
            {/* <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon> */}
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    // <div>
        <React.Fragment key={"left"}>
          <Button onClick={toggleDrawer(true)} id="menu-btn"><MenuIcon /></Button>
          <Drawer
            anchor={"left"}
            open={openMenu}
            onClose={toggleDrawer(false)}
          >
            {list("left")}
          </Drawer>
        </React.Fragment>
    // </div>
  );
}

export default Menu