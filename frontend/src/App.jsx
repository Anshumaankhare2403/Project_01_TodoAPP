import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SigninAndSignup from "./pages/Signin.jsx"; // imported component
import HomePage from "./pages/HomePage.jsx";

function App() {
  const isAuth = !!localStorage.getItem("token"); // check if user is logged in

  return (
    <Router>
      <Routes>
        {/* Redirect logged-in users away from signin/signup */}
        <Route
          path="/signinandsignup"
          element={isAuth ? <Navigate to="/" /> : <SigninAndSignup />}
        />

        {/* Protect homepage */}
        <Route
          path="/"
          element={isAuth ? <HomePage /> : <Navigate to="/signinandsignup" />}
        />

        {/* Catch-all redirect */}
        <Route
          path="*"
          element={<Navigate to={isAuth ? "/homepage" : "/"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
