// Login.jsx
import React, { useState } from "react";
import { TextField, Button, Typography, Container, Paper, Link } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      localStorage.setItem("token", res.data.access_token);
      alert("Login successful!");
      navigate("/editor");
    } catch (err) {
      alert("Login failed.");
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: 80 }}>
      <Paper style={{ padding: 30, backgroundColor: "#1E1E1E" }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button fullWidth variant="contained" color="primary" onClick={handleLogin} style={{ marginTop: 20 }}>
          Login
        </Button>
        <Typography style={{ marginTop: 16 }}>
          Don’t have an account?{' '}
          <Link href="/register" underline="hover">
            Register here
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Login;
