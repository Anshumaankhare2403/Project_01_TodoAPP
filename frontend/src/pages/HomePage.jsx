import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CssBaseline,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";

const darkTheme = createTheme({ palette: { mode: "dark" } });
const API = "http://localhost:3000/todolist";

// Neon colors based on priority
const getNeonColor = (priority) => {
  switch (priority) {
    case "low":
      return "#0f0"; // green
    case "medium":
      return "#ff0"; // yellow
    case "high":
      return "#f00"; // red
    default:
      return "#0ff"; // cyan
  }
};

function HomePage() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch todos once
  useEffect(() => {
    axios
      .get(`${API}/todoget`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) =>
        setTodos(res.data.map((t) => ({ ...t, localCompleted: false })))
      )
      .catch((err) => console.error(err));
  }, [token]);

  // Open and close dialog
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setTitle("");
    setDescription("");
    setPriority("medium");
    setOpen(false);
  };

  // Add todo (reload page after adding)
  const handleAdd = async () => {
    if (!title.trim()) return;
    try {
      await axios.post(
        `${API}/todocreate`,
        { title, description, priority, status: "pending" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      handleClose();
      window.location.reload(); // reload page to reflect new task
    } catch (err) {
      console.error(err);
    }
  };

  // Delete todo (reload page after deleting)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/tododeleting/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.reload(); // reload page to reflect deletion
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle completion (update DB & reload)
  const handleToggleStatus = async (id, status) => {
    const newStatus = status === "completed" ? "pending" : "completed";
    try {
      await axios.put(
        `${API}/todoupdate/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.reload(); // reload to show completed/line-through
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        {/* Card with neon glow */}
        <Card
          sx={{
            p: 2,
            borderRadius: 4,
            backgroundColor: "#111",
            border: "2px solid #0ff",
            boxShadow: "0 0 10px #0ff, 0 0 20px #0ff, 0 0 40px #0ff",
            transition: "0.3s",
            "&:hover": {
              boxShadow: "0 0 20px #0ff, 0 0 40px #0ff, 0 0 80px #0ff",
            },
          }}
        >
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              📝 Todo List
            </Typography>

            {/* Add Todo Button */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<AddIcon />}
              onClick={handleOpen}
            >
              Add Todo
            </Button>

            {/* Todo List */}
            <List sx={{ mt: 3 }}>
              {todos.map((todo) => {
                const neonColor = getNeonColor(todo.priority);
                return (
                  <ListItem
                    key={todo._id}
                    sx={{
                      mb: 1,
                      border: `1px solid ${neonColor}`,
                      borderRadius: 2,
                      boxShadow: `0 0 5px ${neonColor}, 0 0 10px ${neonColor}`,
                      transition: "0.3s",
                      "&:hover": {
                        boxShadow: `0 0 10px ${neonColor}, 0 0 20px ${neonColor}`,
                      },
                    }}
                    secondaryAction={
                      <>
                        {/* Completion toggle */}
                        <IconButton
                          color={
                            todo.status === "completed"
                              ? "secondary"
                              : "success"
                          }
                          onClick={() =>
                            handleToggleStatus(todo._id, todo.status)
                          }
                        >
                          <CheckCircleIcon />
                        </IconButton>

                        {/* Delete button */}
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(todo._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemText
                      primary={`${todo.title} (${todo.priority})`}
                      secondary={todo.description}
                      sx={{
                        textDecoration:
                          todo.status === "completed" ? "line-through" : "none",
                        color: todo.status === "completed" ? "gray" : "inherit",
                      }}
                    />
                  </ListItem>
                );
              })}
            </List>
          </CardContent>
        </Card>
      </Container>

      {/* Popup Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Todo</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mt: 2 }}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default HomePage;
