import { db } from "./dbConnection.js";
import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
let PORT = 8080;
app.listen(PORT, console.log(`Listening on port ${PORT}`));
app.get("/", async (req, res) => {
  let response = await db.query(`SELECT * FROM users`);
  let data = response.rows; //database info saved as data (object)
  let body = req.body;
  let usernameToTest = body.username;
  let validUser = false;
  let currUserID;
  console.log(usernameToTest);
  data.forEach((user) => {
    console.log(user.username);
    if (usernameToTest === user.username) {
      validUser = true;
      currUserID = data.id;
    }
  });
  if (validUser == true) {
    res.json({ validUser: true, userID: currUserID });
  } else if (validUser == false) {
    res.json("Username not found, try registering instead");
  }
}); //login page expects (e.g.{"username":"Callum"})

app.post("/register", async (req, res) => {
  let response = await db.query(`SELECT * FROM users`);
  let data = response.rows; //database info saved as data (object)
  let body = req.body;
  let usernameTaken = false;
  let usernameToTry = body.usernameToTry;
  data.forEach((username) => {
    if (usernameToTry === username) {
      usernameTaken = true;
    }
  });
  if (usernameTaken == false) {
    db.query(`INSERT INTO users (username) VALUES ($1)`, [usernameToTry]);
    res.json("User registered");
  } else {
    res.json("Username already taken");
  }
}); //registration page (adding new user) (expects body with usernameToTry)
app.post("/add-new-task", async (req, res) => {
  let body = req.body;
  let userID = body.newTask.userID;
  let taskName = body.newTask.taskName;
  let taskState = body.newTask.taskState;
  let taskDesc = body.newTask.taskDesc;
  try {
    db.query(
      `INSERT INTO tasks (user_id,task_name,task_state,task_desc) VALUES ($1,$2,$3,$4)`,
      [userID, taskName, taskState, taskDesc]
    );
    res.json("Task added");
  } catch {
    console.error(`task creation failed due to :${error}`);
  }
}); //profile page (username in body, alongside other info)(expecting object in body newTask{userid,taskName,taskState,taskDesc})
app.get("/profile", (req, res) => {}); //profile pulling from db (hopefully all on same page if not add more get requests)
