import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
export default function SpecificTask() {
  const [userID] = useState(() => {
    const saved = localStorage.getItem("userID");
    return saved || "";
  });
  const [taskData, setTaskData] = useState();
  const { taskNo } = useParams();
  useEffect(() => {
    async function getTaskData() {
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
    getTaskData();
  }, [taskNo, userID]);
  return (
    <div>
      {taskData?.taskName ? <h1>{taskData.taskName}</h1> : null}
      {taskData?.taskState ? <h2>{taskData.taskState}</h2> : null}
      {taskData?.taskDesc ? <p>{taskData.taskDesc}</p> : null}
      <button>Change State</button>
      <button>Delete</button>
    </div>
  );
}
