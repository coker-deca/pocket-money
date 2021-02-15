import createConnectionPool, { sql } from '@databases/pg';
// import { DATABASE_URL } from "../setting"

// N.B. you will need to replace this connection
// string with the correct string for your database.
const db = createConnectionPool(
  process.env.DATABASE_URL
);

 //db.dispose();
console.log(process.env.DATABASE_URL)
export { db, sql };