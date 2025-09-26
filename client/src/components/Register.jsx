import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Navigate, useNavigate } from "react-router";
export default function Register() {
  let navigate = useNavigate();
  const [usernameToTry, setUsernameToTry] = useState("");
  //   const [showRegisterModal, setShowRegisterModal] = useState(false);
  let res;
  async function handleRegister() {
    if (usernameToTry != "") {
      let response = await fetch("http://localhost:8080/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernameToTry: usernameToTry }),
      });
      res = await response.json();
      //   setShowRegisterModal(true);
      if (res != "User registered") {
        setUsernameToTry("");
      } else if (res == "User registered") {
        navigate(`/profile/${usernameToTry}`);
      }
    }
  }
  return (
    <>
      <h1>Register</h1>
      <label htmlFor="usernameToTry">Username</label>
      <input
        type="usernameToTry"
        value={usernameToTry}
        onChange={() => setUsernameToTry(event.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {/* <Modal
        show={showRegisterModal}
        onHide={() => setShowRegisterModal(false)}
      >
        {res}
      </Modal> */}
    </>
  );
}
