import { useState } from "react";
import { useEffect } from "react";

export default function ListUsers() {
  const [userList, setUserList] = useState("");
  useEffect(() => {
    async function getUsers() {
      let response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users`);
      let data = await response.json();
      setUserList(data);
    }
    getUsers();
    let userIntervalID = setInterval(getUsers, 2000);
    return () => clearInterval(userIntervalID);
  }, []);

  return (
    <>
      <h1>Users</h1>
      {userList != ""
        ? userList.map((user, i) => {
            return <p key={`userNo${i}`}>{user.username}</p>;
          })
        : null}
    </>
  );
}
