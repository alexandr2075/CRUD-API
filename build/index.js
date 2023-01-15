"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const dotenv = __importStar(require("dotenv"));
const node_http_1 = __importDefault(require("node:http"));
const url_1 = __importDefault(require("url"));
const delete_1 = require("./delete");
const putUser_1 = require("./putUser");
const createUser_1 = require("./createUser");
const getUsersAndOneUser_1 = require("./getUsersAndOneUser");
dotenv.config();
const port = process.env.PORT;
const users = [];
exports.server = node_http_1.default
    .createServer((req, res) => {
    if (req.url) {
        let urlRequest = url_1.default.parse(req.url, true);
        const path = urlRequest.path;
        if (path) {
            const idFromPath = path.split("/").at(-1);
            if (req.method === "GET") {
                (0, getUsersAndOneUser_1.getUsersAndOneUser)(path, res, idFromPath, users);
            }
            else if (req.method === "POST") {
                (0, createUser_1.createUser)(users, req, res);
            }
            else if (req.method === "PUT") {
                (0, putUser_1.putUser)(users, idFromPath, req, res);
            }
            else if (req.method === "DELETE") {
                (0, delete_1.deleteUser)(users, idFromPath, res);
            }
        }
    }
})
    .listen(port);
console.log(`Running server on port ${port}`);
