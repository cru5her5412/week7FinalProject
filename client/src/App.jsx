import { Route, Router } from "react-router";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Profile from "./components/Profile.jsx";
export default function App() {
  return (
    <>
      <h1>App</h1>
      <Router>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:username" element={<Profile />}>
          <Route path="/profile/:username/todo" element={<Register />} />
          <Route path="/profile/:username/doing" element={<Register />} />
          <Route path="/profile/:username/done" element={<Register />} />
        </Route>
      </Router>
    </>
  );
}
