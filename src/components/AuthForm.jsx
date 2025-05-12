import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { logOut, signIn } from "../utils/auth";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      alert("Sign-in successful!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogOut = async () => {
    try {
      await logOut();
      alert("Logged out successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h2">
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSignIn}
        >
          Sign In
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={handleLogOut}
        >
          Log Out
        </Button>
      </Box>
    </Container>
  );
}

export default AuthForm;
