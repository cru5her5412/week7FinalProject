import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import "./SpecificTask.css";
export default function SpecificTask() {
  let navigate = useNavigate();
  const [userID] = useState(() => {
    const saved = localStorage.getItem("userID");
    return saved || "";
  });
  const [username] = useState(() => {
    const saved = localStorage.getItem("username");
    return saved || "";
  });
  const [taskData, setTaskData] = useState();
  const { taskNo } = useParams();
  useEffect(() => {
    async function getTaskData() {
      if (userID != "" || userID != undefined) {
        let response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/profile/specific-task`,
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userID: userID, taskNo: taskNo }),
          }
        );
        let res = await response.json();
        setTaskData(res);
      }
    }
    getTaskData();
  }, [taskNo, userID]);

  return (
    <div className="bgDiv">
      <div className="backgroundDiv">
        {taskData?.taskName ? (
          <h1 className={`taskName ${taskData.taskState}State`}>
            {taskData.taskName}
          </h1>
        ) : null}
        <div className="mainText">
          {taskData?.taskState ? (
            <h2 className="taskState">{taskData.taskState}</h2>
          ) : null}
          {taskData?.taskDesc ? (
            <p className="taskDesc">{taskData.taskDesc}</p>
          ) : null}
        </div>
        <button
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
      </div>
    </div>
  );
}
