import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Header({ darkMode, toggleDarkMode, currentUser }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Meezan Funds Dashboard
        </Typography>
        <IconButton color="inherit" onClick={toggleDarkMode}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        {currentUser ? (
          <>
            <Button color="inherit" component={Link} to="/">
              GraphPage
            </Button>
            <Button color="inherit" component={Link} to="/investments">
              Investments Tracker
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/auth">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
