import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import "./Profile.css";
export default function Profile() {
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter");
  const { username } = useParams();
  const [currUsername] = useState(username);
  const [userData, setUserData] = useState([]);
  const [userID] = useState(() => {
    const saved = localStorage.getItem("userID");
    return saved || "";
  });
  useEffect(() => {
    async function getProfileData() {
      if (userID != "" || userID != undefined) {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/profile/`,
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userID: userID }),
          }
        );
        let data = await response.json();
        setUserData(data[0]);
      }
    }
    getProfileData();
    let profileDataInterval = setInterval(getProfileData, 2000);
    return () => clearInterval(profileDataInterval);
  }, [userID]);
  let userDataSorted = [];
  function sortDataByFilter(filter, outputArray) {
    for (let i = 0; i < userData.task_name.length; i++) {
      let tempArray = [];
      tempArray.push(userData.task_name[i]);
      tempArray.push(userData.task_state[i]);
      tempArray.push(userData.task_desc[i]);
      if (filter != "" && userData.task_state[i] == filter) {
        outputArray.push(tempArray);
      } else if (!filter) {
        outputArray.push(tempArray);
      }
    }
  }
  if (userData != "" && userData != undefined) {
    sortDataByFilter(filter, userDataSorted);
  }
  let userDataTodo = [];
  let userDataDoing = [];
  let userDataDone = [];
  if (userData != "" && userData != undefined) {
    sortDataByFilter("todo", userDataTodo);

    sortDataByFilter("doing", userDataDoing);

    sortDataByFilter("done", userDataDone);
  }

  return (
    <div>
      <h1>Welcome {currUsername}</h1>
      <section id="tasks">
        <section id="todo" className="taskType">
          <h2>To Do</h2>
          {userData != "" && userData != undefined
            ? userDataTodo.map((task, i) => (
                <div
                  key={`taskNo${i}`}
                  id={`taskNo${i}`}
                  className={`${userDataTodo[i][1]}State individualTask`}
                >
                  {task.map((data, index) => (
                    <p
                      key={`task${index}`}
                      className={`partOfTask partNo${index}`}
                    >
                      {data}
                    </p>
                  ))}
                </div>
              ))
            : null}
        </section>
        <section id="doing" className="taskType">
          <h2>Doing</h2>
          {userData != "" && userData != undefined
            ? userDataDoing.map((task, i) => (
                <div
                  key={`taskNo${i}`}
                  id={`taskNo${i}`}
                  className={`${userDataDoing[i][1]}State individualTask`}
                >
                  {task.map((data, index) => (
                    <p
                      key={`task${index}`}
                      className={`partOfTask partNo${index}`}
                    >
                      {data}
                    </p>
                  ))}
                </div>
              ))
            : null}
        </section>
        <section id="done" className="taskType">
          <h2>Done</h2>
          {userData != "" && userData != undefined
            ? userDataDone.map((task, i) => (
                <div
                  key={`taskNo${i}`}
                  id={`taskNo${i}`}
                  className={`${userDataDone[i][1]}State individualTask`}
                >
                  {task.map((data, index) => (
                    <p
                      key={`task${index}`}
                      className={`partOfTask partNo${index}`}
                    >
                      {data}
                    </p>
                  ))}
                </div>
              ))
            : null}
        </section>
        {/*Takes each task, and puts all its data into individual divs. current method is bad, but i couldnt get a function to work here */}
      </section>
      <section className="profileButtons">
        <button
          id="profileAddTaskButton"
          className="profileButton"
          onClick={() => navigate(`/profile/${username}/add-task`)}
        >
          Add New Task
        </button>
        <button
          id="profileLogoutButton"
          className="profileButton"
          onClick={() => {
            navigate(`/`);
            localStorage.setItem("userID", "");
            localStorage.setItem("username", "");
          }}
        >
          Logout
        </button>
      </section>
    </div>
  );
}
