import { useState } from "react";
import { useNavigate } from "react-router";
import "./AddTask.css";
export default function AddTask() {
  let navigate = useNavigate();
  const [userID] = useState(() => {
    let saved = localStorage.getItem("userID");
    return saved || "";
  });
  const [username] = useState(() => {
    let saved = localStorage.getItem("username");
    return saved || "";
  });
  if (username === "" || userID === "") {
    navigate("/");
  }
  const [taskName, setTaskName] = useState();
  const [taskState, setTaskState] = useState();
  const [taskDesc, setTaskDesc] = useState();
  let res = "";
  async function submitForm(event) {
    event.preventDefault();
    if (username === "" || userID === "") {
      navigate("/");
    }
    const form = event.target;
    let formData = new FormData(form);
    let formInfo = Object.fromEntries(formData);
    let response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/add-new-task`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newTask: {
            userID: userID,
            taskName: formInfo.taskName,
            taskState: formInfo.taskState,
            taskDesc: formInfo.taskDesc,
          },
        }),
      }
    );
    res = await response.json();
  }
  if (res == "Task added") {
    setTaskDesc("");
    setTaskName("");
    setTaskState("");
  }
  return (
    <div>
      <button
        className="backButton"
        onClick={() => {
          try {
            navigate(`/profile/${username}`);
          } catch {
            navigate("/");
          }
        }}
      >
        Back
      </button>
      <form onSubmit={submitForm}>
        <label className="newTaskLabel" htmlFor="taskName">
          Task Name
        </label>
        <input
          className="newTaskPart"
          type="text"
          name="taskName"
          value={taskName}
          onChange={() => setTaskName(event.target.value)}
          required
        />
        <label className="newTaskLabel" htmlFor="taskState">
          Task State
        </label>
        <select
          className="newTaskPart"
          type="text"
          name="taskState"
          onChange={() => {
            setTaskState(event.target.value);
          }}
          value={taskState}
          required
        >
          <option value="">Select a value</option>
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        <label className="newTaskLabel" htmlFor="taskDesc">
          Task Description
        </label>
        <input
          className="newTaskPart"
          type="text"
          name="taskDesc"
          value={taskDesc}
          onChange={() => setTaskDesc(event.target.value)}
          required
        />

        <button className="newTaskPart submitButton" type="submit">
          Add task
        </button>
      </form>
      {res != "" ? <p>{res}</p> : null}
    </div>
  );
}
