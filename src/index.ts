import * as dotenv from 'dotenv';
import http from "node:http";
import url from "url";
import { deleteUser } from "./delete";
import { putUser } from "./putUser";
import { createUser } from "./createUser";
import { getUsersAndOneUser } from "./getUsersAndOneUser";
dotenv.config();

const port = process.env.PORT;

export type UserType = {
  id: string
  username: string
  age: number
  hobbies: Array<string>
}

const users: Array<UserType> = [];

export const server = http
  .createServer((req, res) => {
    if (req.url) {
      let urlRequest = url.parse(req.url, true);
      const path = urlRequest.path;
      if (path) {
        const idFromPath = path.split("/").at(-1);

        if (req.method === "GET") {
          getUsersAndOneUser(path, res, idFromPath, users);
        } else if (req.method === "POST") {
          createUser(users, req, res);
        } else if (req.method === "PUT") {
          putUser(users, idFromPath, req, res);
        } else if (req.method === "DELETE") {
          deleteUser(users, idFromPath, res);
        }
      }
    }
  })
  .listen(port);

console.log(`Running server on port ${port}`);
