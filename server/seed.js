import { db } from "./dbConnection.js";
db.query(
  `INSERT INTO tasks (user_id, task_name, task_state, task_desc) VALUES(1, 'database setup' , 'doing' , 'Initial setup of my website database')`
);
