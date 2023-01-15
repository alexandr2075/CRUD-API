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
const node_cluster_1 = __importDefault(require("node:cluster"));
const node_http_1 = __importDefault(require("node:http"));
const node_os_1 = require("node:os");
const node_process_1 = __importDefault(require("node:process"));
const dotenv = __importStar(require("dotenv"));
const url_1 = __importDefault(require("url"));
const delete_1 = require("./delete");
const putUser_1 = require("./putUser");
const createUser_1 = require("./createUser");
const getUsersAndOneUser_1 = require("./getUsersAndOneUser");
dotenv.config();
const port = node_process_1.default.env.PORT;
const numCPUs = (0, node_os_1.cpus)().length;
let usersFromPrim = [];
if (node_cluster_1.default.isPrimary) {
    console.log(`Primary ${node_process_1.default.pid} is running`);
    node_http_1.default.createServer((req, res) => {
    }).listen(port);
    console.log(`Primary ${node_process_1.default.pid} started on ${port}`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        let forkedWorker = node_cluster_1.default.fork();
        forkedWorker.on('message', (workerMessage) => {
            if (workerMessage) {
                console.log(workerMessage);
                usersFromPrim = workerMessage;
                let workerPool = node_cluster_1.default.workers;
                if (workerPool) {
                    let workerKeys = Object.keys(workerPool);
                    workerKeys.forEach(workerKey => {
                        if (workerPool) {
                            let workerProcess = workerPool[workerKey];
                            workerProcess === null || workerProcess === void 0 ? void 0 : workerProcess.send(usersFromPrim);
                        }
                    });
                }
            }
        });
    }
    node_cluster_1.default.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}
else {
    let users = [];
    if (node_process_1.default.env.PORT && node_cluster_1.default.worker) {
        const port = Number(node_process_1.default.env.PORT) + Number(node_cluster_1.default.worker.id);
        node_http_1.default.createServer((req, res) => {
            if (req.url) {
                let urlRequest = url_1.default.parse(req.url, true);
                const path = urlRequest.path;
                if (path) {
                    const idFromPath = path.split("/").at(-1);
                    const sendMsg = () => {
                        node_process_1.default.on('message', (usersFromPrim) => {
                            console.log(usersFromPrim);
                            users = usersFromPrim;
                            if (node_process_1.default.send) {
                                node_process_1.default.send(users);
                            }
                        });
                    };
                    if (req.method === "GET") {
                        (0, getUsersAndOneUser_1.getUsersAndOneUser)(path, res, idFromPath, users);
                    }
                    else if (req.method === "POST") {
                        (0, createUser_1.createUser)(users, req, res);
                        sendMsg();
                    }
                    else if (req.method === "PUT") {
                        (0, putUser_1.putUser)(users, idFromPath, req, res);
                    }
                    else if (req.method === "DELETE") {
                        (0, delete_1.deleteUser)(users, idFromPath, res);
                    }
                }
            }
        }).listen(port);
        console.log(`Worker ${node_process_1.default.pid} started on ${port}`);
    }
}
