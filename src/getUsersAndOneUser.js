export const getUsersAndOneUser = (path, res, idFromPath, users) => {
    if (path === "/api/users") {
        res.statusCode;
        res.end(JSON.stringify(users));
      } else {
        users.forEach((user) => {
          if (user.id === idFromPath) {
            res.statusCode;
            res.end(JSON.stringify(user));
          } else {
            res.statusCode = 400;
            res.end("Not such user");
          }
        });
      }
}