import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  AppBar,
  Button,
  Container,
  createTheme,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthForm from "./components/AuthForm"; // <-- Added AuthForm import
import GraphPage from "./pages/GraphPage";
import InvestmentsTracker from "./pages/InvestmentsTracker";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: { main: "#388e3c" },
          secondary: { main: "#81c784" },
        },
      }),
    [darkMode]
  );

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Meezan Funds Dashboard
            </Typography>
            <IconButton color="inherit" onClick={toggleDarkMode}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Button color="inherit" component={Link} to="/">
              GraphPage
            </Button>
            <Button color="inherit" component={Link} to="/investments">
              Investments Tracker
            </Button>
            <Button color="inherit" component={Link} to="/auth">
              Auth
            </Button>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 2 }}>
          <Routes>
            <Route path="/" element={<GraphPage />} />
            <Route path="/investments" element={<InvestmentsTracker />} />
            <Route path="/auth" element={<AuthForm />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
