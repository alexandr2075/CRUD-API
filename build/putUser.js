"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putUser = void 0;
const putUser = (users, idFromPath, req, res) => {
    let body;
    req.on("data", (data) => {
        body = data.toString();
        users.forEach((user, index) => {
            if (user.id === idFromPath) {
                const updateUser = JSON.parse(body);
                updateUser.id = idFromPath;
                users[index] = updateUser;
                res.statusCode;
                res.end(JSON.stringify(updateUser));
                return;
            }
            else {
                res.statusCode = 400;
                res.end("Not such user");
            }
        });
    });
};
exports.putUser = putUser;
