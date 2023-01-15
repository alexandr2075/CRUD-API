import http from "node:http";
import { UserType } from ".";

const pid = process.pid;

export const getUsersAndOneUser = (path: string, res: http.ServerResponse, idFromPath: string | undefined, users: Array<UserType>) => {

  if (path === "/api/users") {

    res.statusCode;
    res.end(JSON.stringify(users));
  } else {
    users.forEach((user) => {
      if (user.id === idFromPath) {
        res.statusCode = 200;
        res.end(JSON.stringify(user));
      } else {
        res.statusCode = 400;
        res.end("Not such user");
      }
    });
  }
}