import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom"; // Correct import for Link

export default function SideMenuNav() {
  return (
    <aside>
      <Drawer variant="permanent" anchor="left">
        <List>
          <ListItem>
            <Button component={RouterLink} to="/">
              <ListItemText primary="Home" />
            </Button>
          </ListItem>
          <ListItem>
            <Button component={RouterLink} to="/todo">
              <ListItemText primary="ToDO" />
            </Button>
          </ListItem>
          <ListItem>
            <Button component={RouterLink} to="/about">
              <ListItemText primary="About" />
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </aside>
  );
}
