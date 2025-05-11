import {
  AppBar,
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import Dashboard from "./components/Dashboard";

const theme = createTheme({
  palette: {
    primary: { main: "#388e3c" },
    secondary: { main: "#81c784" },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Meezan Funds Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 2 }}>
        <Dashboard />
      </Container>
    </ThemeProvider>
  );
}

export default App;
