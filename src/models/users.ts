import Client from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

// const dotenvResult = dotenv.config();
// if (dotenvResult.error){
//     throw new Error(`Error loading .env file: ${dotenvResult.error}`)
// } else console.log("Working fine");

const saltRounds = process.env.SALT_ROUNDS as string;
const pepper = process.env.BCRYPT_PASSWORD;

//console.log(`This is salt and pepper: ${typeof saltRounds}, ${typeof pepper}`);

export type User = {
  id?: number;
  user_name: string;
  user_password: string;
};

const defaultUser: User = {
  id: 0,
  user_name: "",
  user_password: "",
};

export class UserStore {
  async index(): Promise<User[]> {
    if (Client) {
      try {
        const conn = await Client.connect();
        const sql = "SELECT * FROM users";

        const result = await conn.query(sql);
        conn.release();
        return result.rows;
      } catch (err) {
        throw new Error(`Could not get users. Error: ${err}`);
      }
    } else {
      console.log("Client is falsy");
      return [];
    }
  }
  async show(id: string): Promise<User> {
    if (Client) {
      try {
        const conn = await Client.connect();
        const sql = "SELECT * FROM users";

        const result = await conn.query(sql);
        conn.release();
        return result.rows[0];
      } catch (err) {
        throw new Error(`Could not get users. Error: ${err}`);
      }
    } else {
      console.log("Client is falsy");
      return defaultUser;
    }
  }
  async create(u: User): Promise<User> {
    if (Client) {
      try {
        const conn = await Client.connect();
        const sql =
          "INSERT INTO users (user_name, user_password) VALUES($1, $2) RETURNING *";

        const hash = bcrypt.hashSync(
          u.user_password + pepper,
          parseInt(saltRounds)
        );

        const result = await conn.query(sql, [u.user_name, hash]);
        const user = result.rows[0];

        conn.release();

        return user;
      } catch (err) {
        throw new Error(`unable to create user (${u.user_name}): ${err}`);
      }
    } else {
      console.log("Client is falsy");
      return defaultUser;
    }
  }
  async authenticate(username: string, password: string): Promise<User | null> {
    if (Client) {
      const conn = await Client.connect();
      const sql = "SELECT password_digest FROM users WHERE username=($1)";

      const result = await conn.query(sql, [username]);

      console.log(password + pepper);

      if (result.rows.length) {
        const user = result.rows[0];

        console.log(user);

        if (bcrypt.compareSync(password + pepper, user.password_digest)) {
          return user;
        }
      }
      //return null if authentication is unsuccessfull
      return null;
    } else {
      console.log("Client is falsy");
      return defaultUser;
    }
  }
}
