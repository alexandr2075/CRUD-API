import http from "node:http";
import { UserType } from "./server";

export const putUser = (users: Array<UserType>, idFromPath: string | undefined, req: http.IncomingMessage, res: http.ServerResponse) => {
    let body: string;
      req.on("data", (data) => {
        
        body = data.toString();

        users.forEach((user, index) => {
          if (user.id === idFromPath) {
            const updateUser = JSON.parse(body);

            users[index] = updateUser;
            res.statusCode;
            res.end(JSON.stringify(updateUser));
            return;
          } else {
            res.statusCode = 400;
            res.end("Not such user");
          }
        });
      });
}