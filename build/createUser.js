"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const uuid_1 = require("uuid");
const createUser = (users, req, res) => {
    let body;
    req.on("data", (data) => {
        body = data.toString();
    });
    req.on("end", () => {
        const user = JSON.parse(body);
        if (user.username && user.age && user.hobbies) {
            user.id = (0, uuid_1.v4)();
            users.push(user);
            res.statusCode = 201;
            res.end(JSON.stringify(user));
            return users;
        }
        res.statusCode = 400;
        res.end("Not contain required fields");
    });
};
exports.createUser = createUser;
