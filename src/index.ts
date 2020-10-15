import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import * as express from "express";
import * as fs from 'fs';
import * as path from 'path';
import * as fastify from 'fastify';
// import * as http2 from 'http2';
// import { pushFile, sendFile } from './utils/http2.utils';
import * as basicAuth from 'fastify-basic-auth';
import { staticServe } from 'fastify-auto-push';


createConnection();

const server = fastify.fastify({
    http2: true,
    https: {
        key: fs.readFileSync(__dirname + "/secret/key.pem"),
        cert: fs.readFileSync(__dirname + "/secret/cert.pem")
    }
})
// async function Authorizer(username: string, password: string, req: fastify.FastifyRequest, reply: fastify.FastifyReply) {
//     let user = await getRepository(User).findOne({ where: { email: username } });
//     if (user) {
//         if (username !== user.email || password !== user.password) {
//             return new Error('Winter is coming')
//         }
//         // const userMatches = basicAuth.safeCompare(username, user.email)
//         // const passwordMatches = basicAuth.safeCompare(password, user.password)
//         // return cb(null, userMatches && passwordMatches);
//     }
//     // return cb(null, false);
// }

// server.register(require('fastify-basic-auth'), { Authorizer })




//Import Routes
import itemroute from './Routes/Items.route';
import { User } from "./entity/User";

//Routes
server.register(itemroute, { prefix: '/items' })

server.get('/', function (request, reply) {
    reply.type("text/html").send(fs.readFileSync('./static/index.html'));
})

server.listen(3001, () => console.log("Server listening on port 3001"));