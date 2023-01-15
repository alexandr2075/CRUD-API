import http from "node:http";
import { UserType } from ".";

export const deleteUser = (users: Array<UserType>, idFromPath: string | undefined, res: http.ServerResponse) => {
  users.forEach((user, index) => {
   
      if (user.id === idFromPath) {
        users.splice(index, 1);
        res.statusCode = 204;
        res.end("The record is found and deleted");
        return;
      } else {
        res.statusCode = 400;
        res.end("Invalid");
      }
  });
}