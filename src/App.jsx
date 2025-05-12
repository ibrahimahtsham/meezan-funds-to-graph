import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import {
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
} from "firebase/auth";
import { useEffect, useMemo, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { auth } from "./firebaseConfig";
import AuthPage from "./pages/AuthPage";
import { logOut } from "./utils/auth";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence);
  }, []);

  // Listen for auth state and enforce a 1-day login limit.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const ts = localStorage.getItem("loginTimestamp");
        if (ts && Date.now() - parseInt(ts, 10) > 86400000) {
          logOut().then(() => {
            localStorage.removeItem("loginTimestamp");
            setCurrentUser(null);
          });
        } else {
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []);

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

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          currentUser={currentUser}
        />
        <Container sx={{ mt: 2 }}>
          <Routes>
            {currentUser ? (
              <Route path="/*" element={<ProtectedRoutes />} />
            ) : (
              <Route path="/*" element={<AuthPage />} />
            )}
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
