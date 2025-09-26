import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";

export default function Profile() {
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
        const response = await fetch(`http://localhost:8080/profile/`, {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userID: userID }),
        });
        let data = await response.json();
        setUserData(data[0]);
      }
    }
    getProfileData();
  }, [userID]);
  let userDataSorted = [];
  if (userData != "" && userData != undefined) {
    for (let i = 0; i < userData.task_name.length; i++) {
      let tempArray = [];
      tempArray.push(userData.task_name[i]);
      tempArray.push(userData.task_state[i]);
      tempArray.push(userData.task_desc[i]);
      userDataSorted.push(tempArray);
    }
  }

  return (
    <>
      <h1>Welcome {currUsername}</h1>
      {userData != "" && userData != undefined
        ? userDataSorted.map((task) =>
            task.map((data, index) => <p key={`task${index}Name`}>{data}</p>)
          )
        : null}
    </>
  );
}
