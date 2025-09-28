import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import "./Login.css";
export default function Login() {
  let navigate = useNavigate();
  const [username, setUsername] = useState(() => {
    const saved = localStorage.getItem("username");
    return saved || "";
  });
  const [userID, setUserID] = useState(() => {
    const saved = localStorage.getItem("userID");
    return saved || "";
  });
  useEffect(() => {
    if (username != "" && userID != "") {
      navigate(`/profile/${username}`);
    }
  });

  async function handleLogin() {
    let response = await fetch(`${import.meta.env.VITE_SERVER_URL}/`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username }),
    });
    let info = await response.json();

    if (info.validUser == true) {
      setUserID(info.userID);
      localStorage.setItem("userID", info.userID);
      localStorage.setItem("username", username);
      navigate(`/profile/${username}`);
    } else {
      setUsername("");
    }
  }
  return (
    <div id="loginContainer">
      <label className="usernameLabel" htmlFor="username">
        Username:
      </label>
      <input
        className="loginPart"
        name="username"
        value={username}
        onChange={() => setUsername(event.target.value)}
        required
      />

      <button className="loginPart" onClick={handleLogin}>
        Login
      </button>
      <button className="loginPart" onClick={() => navigate("/register")}>
        Register
      </button>
    </div>
  );
}
