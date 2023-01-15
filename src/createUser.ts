import { v4 as uuidv4 } from "uuid";
import { UserType } from ".";
import http from "node:http";
import nodeCluster from "node:cluster";

export const createUser = (users: Array<UserType>, req: http.IncomingMessage, res: http.ServerResponse): void | [] => {
  let body: string;

  req.on("data", (data) => {
    body = data.toString();
  });
  req.on("end", () => {
    const user = JSON.parse(body);

    if (user.username && user.age && user.hobbies) {
      user.id = uuidv4();
      users.push(user);
      res.statusCode = 201;
      res.end(JSON.stringify(user));
      return users;
    }
    res.statusCode = 400;
    res.end("Not contain required fields");
  });
}