import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Navigate, useNavigate } from "react-router";
import "./Register.css";
export default function Register() {
  let navigate = useNavigate();
  const [usernameToTry, setUsernameToTry] = useState("");
  //   const [showRegisterModal, setShowRegisterModal] = useState(false);
  let res;
  async function handleRegister() {
    if (usernameToTry != "") {
      let response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/register`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usernameToTry: usernameToTry }),
        }
      );
      res = await response.json();
      //   setShowRegisterModal(true);
      if (res == "Username already taken") {
        setUsernameToTry("");
      } else if (res != "Username already taken" && res != undefined) {
        let parsedData = JSON.parse(res);
        localStorage.setItem("username", parsedData.username);
        localStorage.setItem("userID", parsedData.userID);
        navigate(`/profile/${usernameToTry}`);
      }
    }
  }
  return (
    <div>
      <label className="usernameLabel" htmlFor="usernameToTry">
        Username
      </label>
      <input
        className="registerPart"
        type="usernameToTry"
        value={usernameToTry}
        onChange={() => setUsernameToTry(event.target.value)}
        required
      />
      <button className="registerPart" onClick={handleRegister}>
        Register
      </button>
      {/* <Modal
        show={showRegisterModal}
        onHide={() => setShowRegisterModal(false)}
      >
        {res}
      </Modal> */}
    </div>
  );
}
