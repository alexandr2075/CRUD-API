import http from "node:http";
import url from "url";
import { deleteUser } from "./delete.js";
import * as dotenv from 'dotenv';
import { putUser } from "./putUser.js";
import { createUser } from "./createUser.js";
import { getUsersAndOneUser } from "./getUsersAndOneUser.js";
dotenv.config();

const port = process.env.PORT;

const users = [];

http
  .createServer((req, res) => {
    let urlRequest = url.parse(req.url, true);
    const path = urlRequest.path;

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
  })
  .listen(port);

console.log(`Running server on port ${port}`);
