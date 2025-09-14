import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function Signin() {
  const [tab, setTab] = useState(0); // 0 = Login, 1 = Register

  // states for inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("user"); // default role

  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  // 🔹 Signup handler
  const handleSignupFormSubmission = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/users/signup", {
        name,
        email,
        password,
        phone,
        role,
      });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/");
        window.location.reload();
      }

      // ✅ Navigate to homepage

      alert("Signup successful: " + res.data.message);
    } catch (err) {
      console.error(err);
      alert("Error signing up");
    }
  };

  // 🔹 Login handler
  const handleLoginFormSubmission = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/users/signin", {
        email,
        password,
      });

      // Save token if backend sends one
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/");
        window.location.reload();
      }

      alert("Login successful: " + res.data.message);
    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f0f0f, #1c1c1c)",
      }}
    >
      <Card
        sx={{
          width: 420,
          borderRadius: 4,
          boxShadow: "0px 0px 25px rgba(0, 255, 255, 0.2)",
          background: "#181818",
          color: "#fff",
          p: 2,
        }}
      >
        <CardContent>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              marginBottom: 3,
              "& .MuiTab-root": { color: "#aaa", fontWeight: "600" },
              "& .Mui-selected": { color: "#00e5ff" },
              "& .MuiTabs-indicator": {
                backgroundColor: "#00e5ff",
                height: "3px",
                borderRadius: "4px",
              },
            }}
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>

          {/* ------------------ LOGIN ------------------ */}
          {tab === 0 && (
            <form onSubmit={handleLoginFormSubmission}>
              <Typography
                variant="h6"
                align="center"
                gutterBottom
                sx={{ fontWeight: "600", color: "#00e5ff" }}
              >
                Welcome Back 👋
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                InputLabelProps={{ style: { color: "#bbb" } }}
                InputProps={{ style: { color: "#fff" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#555" },
                    "&:hover fieldset": { borderColor: "#00e5ff" },
                  },
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                InputLabelProps={{ style: { color: "#bbb" } }}
                InputProps={{ style: { color: "#fff" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#555" },
                    "&:hover fieldset": { borderColor: "#00e5ff" },
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  py: 1.2,
                  fontWeight: "600",
                  borderRadius: "8px",
                  background: "linear-gradient(90deg,#00e5ff,#29ffc6)",
                  "&:hover": {
                    background: "linear-gradient(90deg,#29ffc6,#00e5ff)",
                  },
                }}
              >
                Login
              </Button>
            </form>
          )}

          {/* ------------------ REGISTER ------------------ */}
          {tab === 1 && (
            <form onSubmit={handleSignupFormSubmission}>
              <Typography
                variant="h6"
                align="center"
                gutterBottom
                sx={{ fontWeight: "600", color: "#00e5ff" }}
              >
                Create an Account 🚀
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                InputLabelProps={{ style: { color: "#bbb" } }}
                InputProps={{ style: { color: "#fff" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#555" },
                    "&:hover fieldset": { borderColor: "#00e5ff" },
                  },
                }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                InputLabelProps={{ style: { color: "#bbb" } }}
                InputProps={{ style: { color: "#fff" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#555" },
                    "&:hover fieldset": { borderColor: "#00e5ff" },
                  },
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                InputLabelProps={{ style: { color: "#bbb" } }}
                InputProps={{ style: { color: "#fff" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#555" },
                    "&:hover fieldset": { borderColor: "#00e5ff" },
                  },
                }}
              />

              {/* Phone Input */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ color: "#bbb", mb: 1 }}>
                  Phone Number
                </Typography>
                <PhoneInput
                  country={"in"}
                  value={phone}
                  onChange={setPhone}
                  inputStyle={{
                    width: "100%",
                    height: "45px",
                    background: "#222",
                    border: "1px solid #555",
                    color: "#fff",
                    borderRadius: "6px",
                  }}
                  buttonStyle={{
                    border: "none",
                    background: "#333",
                  }}
                  dropdownStyle={{
                    background: "#222",
                    color: "#fff",
                  }}
                />
              </Box>

              {/* Role Selection */}
              <FormControl
                fullWidth
                margin="normal"
                sx={{
                  "& .MuiInputLabel-root": { color: "#bbb" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#555" },
                    "&:hover fieldset": { borderColor: "#00e5ff" },
                  },
                }}
              >
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  sx={{ color: "#fff" }}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  py: 1.2,
                  fontWeight: "600",
                  borderRadius: "8px",
                  background: "linear-gradient(90deg,#00e5ff,#29ffc6)",
                  "&:hover": {
                    background: "linear-gradient(90deg,#29ffc6,#00e5ff)",
                  },
                }}
              >
                Register
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Signin;
