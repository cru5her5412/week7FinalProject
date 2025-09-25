import { db } from "./dbConnection.js";
import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
let PORT = 8080;
app.listen(PORT, `Listening on port ${PORT}`);
app.get("/", (req, res) => {}); //login page
app.get("/register", (req, res) => {}); //registration page (pulling to prevent duplicate usernames)
app.post("/register", (req, res) => {}); //registration page
app.post("/add-new-task", (req, res) => {}); //profile page (username in body, alongside other info)
app.get("/profile", (req, res) => {}); //profile pulling from db (hopefully all on same page if not add more get requests)
