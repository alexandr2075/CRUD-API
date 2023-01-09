export const putUser = (users, idFromPath, req, res) => {
    let body;
      req.on("data", (data) => {
        
        body = data.toString();

        users.forEach((user, index) => {
          if (user.id === idFromPath) {
            const updateUser = JSON.parse(body);

            users[index] = updateUser;
            res.statusCode;
            res.end(JSON.stringify(user));
            return;
          } else {
            res.statusCode = 400;
            res.end("Not such user");
          }
        });
      });
}