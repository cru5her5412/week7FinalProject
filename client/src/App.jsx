import { Route, Routes } from "react-router";
import AddTask from "./components/AddTask/AddTask";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import SpecificTask from "./components/SpecificTask/SpecificTask";
import "./App.css";
export default function App() {
  return (
    <div id={"blueBackground"}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/profile/:username/add-task" element={<AddTask />} />
        <Route path="/profile/:username/:taskNo" element={<SpecificTask />} />
      </Routes>
    </div>
  );
}
