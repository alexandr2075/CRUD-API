import { v4 as uuidv4 } from "uuid";

export const createUser = (users, req, res) => {
    let body;

    req.on("data", (data) => {
      body = data.toString();
    });
    req.on("end", () => {
      const user = JSON.parse(body);

      if (user.username && user.age && user.hobbies) {
        user.id = uuidv4();
        users.push(user);
        res.statusCode;
        res.end(JSON.stringify(user));
        return;
      }
      res.statusCode = 400;
      res.end("Not contain required fields");
    });
}