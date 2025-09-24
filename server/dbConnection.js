import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const dbConStr = process.env.DB_CONNECTION_STR;
export const db = new pg.Pool({ connectionString: dbConStr });
