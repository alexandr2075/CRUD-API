import cluster from 'node:cluster';
import http from 'node:http';
import { cpus } from 'node:os';
import process from 'node:process';
import * as dotenv from 'dotenv';
import url from "url";
import { deleteUser } from "./delete";
import { putUser } from "./putUser";
import { createUser } from "./createUser";
import { getUsersAndOneUser } from "./getUsersAndOneUser";
dotenv.config();
import cp from 'child_process';

const port = process.env.PORT;
const numCPUs = cpus().length;


export type UserType = {
  id: string
  username: string
  age: number
  hobbies: Array<string>
}


let usersFromPrim: Array<UserType> = [];

if (cluster.isPrimary) {
    
  console.log(`Primary ${process.pid} is running`);

  http.createServer((req, res) => {
   

  }).listen(port);

  console.log(`Primary ${process.pid} started on ${port}`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    let forkedWorker = cluster.fork();

    forkedWorker.on('message', (workerMessage: Array<UserType>) => {


      if (workerMessage) {

        console.log(workerMessage);
        
        usersFromPrim = workerMessage

        let workerPool = cluster.workers;
        if (workerPool) {

          let workerKeys = Object.keys(workerPool);
          workerKeys.forEach(workerKey => {
            if (workerPool) {
            let workerProcess = workerPool[workerKey];
            workerProcess?.send(usersFromPrim)
            }
          })
        }
      }
  })
}

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });

} else {

    let users: Array<UserType> = [];
    if (process.env.PORT && cluster.worker) {

        const port = Number(process.env.PORT) + Number(cluster.worker.id);

  http.createServer((req, res) => {
    if (req.url) {
      let urlRequest = url.parse(req.url, true);
      const path = urlRequest.path;
      if (path) {
        const idFromPath = path.split("/").at(-1);

       const sendMsg = () => {process.on('message', (usersFromPrim: Array<UserType>) => {
            console.log(usersFromPrim);
            
            users = usersFromPrim;
            if (process.send) {
              process.send(users)
            }
          });
        }

        if (req.method === "GET") {
          getUsersAndOneUser(path, res, idFromPath, users);
        } else if (req.method === "POST") {
          createUser(users, req, res);
          sendMsg();
        } else if (req.method === "PUT") {
          putUser(users, idFromPath, req, res);
        } else if (req.method === "DELETE") {
          deleteUser(users, idFromPath, res);
        }
      }
    }

  }).listen(port);

 

  console.log(`Worker ${process.pid} started on ${port}`);
}
}