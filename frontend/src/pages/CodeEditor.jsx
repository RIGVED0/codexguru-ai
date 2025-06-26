// CodeEditor.jsx
import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CodeEditor() {
  const [code, setCode] = useState("");
  const [summary, setSummary] = useState("");
  const [debug, setDebug] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const analyzeCode = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/analyze-debug`,
        { code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSummary(res.data.summary);
      setDebug(res.data.debug);
      alert(res.data.cached ? "⚡ Result loaded from cache." : "✅ Fresh analysis completed.");
    } catch (err) {
      console.error(err);
      alert("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: 30 }}>
      <Paper style={{ padding: 24, backgroundColor: "#1E1E1E" }}>
        <Typography variant="h5" gutterBottom>
          Paste Your Code
        </Typography>
        <TextField
          fullWidth
          multiline
          minRows={10}
          placeholder="Enter your code here"
          variant="outlined"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          InputProps={{ style: { fontFamily: "monospace" } }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={analyzeCode}
          disabled={loading}
          style={{ marginTop: 20 }}
        >
          {loading ? <CircularProgress size={24} /> : "Analyze & Debug"}
        </Button>

        {summary && (
          <Box mt={4}>
            <Typography variant="h6">📝 Summary</Typography>
            <Paper style={{ backgroundColor: "#2e2e2e", padding: 16 }}>
              <Typography style={{ whiteSpace: "pre-wrap" }}>{summary}</Typography>
            </Paper>
          </Box>
        )}

        {debug && (
          <Box mt={4}>
            <Typography variant="h6">🐞 Debug Report</Typography>
            <Paper style={{ backgroundColor: "#2e2e2e", padding: 16 }}>
              <Typography style={{ whiteSpace: "pre-wrap" }}>{debug}</Typography>
            </Paper>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default CodeEditor;

