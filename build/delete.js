"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
const deleteUser = (users, idFromPath, res) => {
    users.forEach((user, index) => {
        try {
            if (user.id === idFromPath) {
                users.splice(index, 1);
                res.statusCode = 204;
                res.end("The record is found and deleted");
                return;
            }
            else {
                res.statusCode = 400;
                res.end("Invalid");
            }
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.deleteUser = deleteUser;
