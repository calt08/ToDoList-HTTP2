import "reflect-metadata";
import { createConnection } from "typeorm";
import * as fastify from 'fastify';
import { readFromFile } from './utils/nonblocking';
import * as fs from 'fs';

createConnection(); //DB

// Creating server object
const server = fastify.fastify({
    http2: true,
    https: {
        key: fs.readFileSync(__dirname + "/secret/example.com+5-key.pem"),
        cert: fs.readFileSync(__dirname + "/secret/example.com+5.pem")
    } // Weirdly when I try to read this on a Non-blocking way some routes stop working
})

//Import Routes
import itemroute from './Routes/Items.route';

//Routes
server.register(itemroute, { prefix: '/items' })

server.get('/', async function (request, reply) {
    reply.type("text/html").send(await readFromFile('./static/index.html'));
})

server.get('/sw.js', async function (request, reply) {
    reply.type("text/javascript").send(await readFromFile('./static/sw.js'));
})

server.listen(3001, () => console.log("Server listening on port 3001"));