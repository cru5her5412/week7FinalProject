import { Route, Routes } from "react-router";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Profile from "./components/Profile.jsx";
import SpecificTask from "./components/SpecificTask.jsx";
import AddTask from "./components/AddTask.jsx";
export default function App() {
  return (
    <>
      <h1>App</h1>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:username" element={<Profile />}>
          <Route
            path="/profile/:username/todo"
            element={<Profile task="todo" />}
          />
          <Route
            path="/profile/:username/doing"
            element={<Profile task="doing" />}
          />
          <Route
            path="/profile/:username/done"
            element={<Profile task="done" />}
          />
          <Route
            path="/profile/:username/:taskName"
            element={<SpecificTask />}
          />
          <Route path="/profile/:username/add-task" element={<AddTask />} />
        </Route>
      </Routes>
    </>
  );
}
