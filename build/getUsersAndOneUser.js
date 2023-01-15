"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersAndOneUser = void 0;
const pid = process.pid;
const getUsersAndOneUser = (path, res, idFromPath, users) => {
    if (path === "/api/users") {
        res.statusCode;
        res.end(JSON.stringify(users));
    }
    else {
        users.forEach((user) => {
            if (user.id === idFromPath) {
                res.statusCode = 200;
                res.end(JSON.stringify(user));
            }
            else {
                res.statusCode = 400;
                res.end("Not such user");
            }
        });
    }
};
exports.getUsersAndOneUser = getUsersAndOneUser;
