import { useEffect, useState } from "react";

function HomePage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch todos on mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem("token"); // get token from signin
        if (!token) {
          alert("Please login first ❌");
          window.location.href = "/"; // redirect to signin
          return;
        }

        const res = await fetch("http://localhost:3000/todoList/todoget", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ pass token
          },
        });

        const data = await res.json();
        console.log("Todos:", data);

        if (!res.ok) {
          alert(data.message || "Failed to fetch todos ❌");
          return;
        }

        setTodos(data);
      } catch (err) {
        console.error("Error fetching todos:", err);
        alert("Network error ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  if (loading) return <h2 className="text-center mt-5">Loading...</h2>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">My Todo List</h1>
      {todos.length === 0 ? (
        <p>No todos found ✅</p>
      ) : (
        <div className="list-group">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="list-group-item list-group-item-action flex-column align-items-start mb-2"
            >
              <h5 className="mb-1">{todo.title}</h5>
              <p className="mb-1">{todo.description}</p>
              <small>
                Due: {new Date(todo.dueDate).toLocaleDateString()} | Priority:{" "}
                {todo.priority}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
