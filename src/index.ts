import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as fs from 'fs';
import * as fastify from 'fastify';
// import * as http2 from 'http2';
// import { pushFile, sendFile } from './utils/http2.utils';

createConnection();

const server = fastify.fastify({
    http2: true,
    https: {
        key: fs.readFileSync(__dirname + "/secret/key.pem"),
        cert: fs.readFileSync(__dirname + "/secret/cert.pem")
    }
})

//Import Routes
import itemroute from './Routes/Items.route';

//Routes
server.register(itemroute, {
    prefix: '/items'
})

server.get('/', function (request, reply) {
    reply.code(200).send({ hello: 'world' }) //SERVER PUSH
})

server.listen(3001, () => console.log("Server listening on port 3001"));




// const app = express();

// //Middlewares
// app.use(express.json());

// //Import Routes
// import itemsRoute from "./Routes/Items.route";
// import userRoute from "./Routes/User.route";

// //Routes Middlewares
// app.use("/items", itemsRoute);
// app.use("", userRoute);

// app.listen(3000, () => console.log("Server listening on port 3000"));

// const PORT = 3001;
        // const serverOptions = {
        //     key: fs.readFileSync(__dirname + "/secret/key.pem"),
        //     cert: fs.readFileSync(__dirname + "/secret/cert.pem")
        // };

        // const RouterHandler = (req: http2.Http2ServerRequest, res: http2.Http2ServerResponse) => {
        //     console.log(req.url);

        //     if (req.url === "/users") {
        //         // push style.css
        //         (res.stream, "/style.css", "style.css");

        //         // push all files in scripts directory
        //         const files = fs.readdirSync(__dirname + "/scripts");
        //         for (let i = 0; i < files.length; i++) {
        //             const fileName = __dirname + "/scripts/" + files[i];
        //             const path = "/scripts/" + files[i];
        //             pushFile(res.stream, path, fileName);
        //         }

        //         // push all files in images directory
        //         const imageFiles = fs.readdirSync(__dirname + "/images");
        //         for (let i = 0; i < imageFiles.length; i++) {
        //             const fileName = __dirname + "/images/" + imageFiles[i];
        //             const path = "/images/" + imageFiles[i];
        //             pushFile(res.stream, path, fileName);
        //         }

        //         // lastly send index.html file
        //         sendFile(res.stream, "index.html");
        //     }
        //     else if (req.url === "/items") {
        //         itemsRouteHandler(req, res);
        //     }
        //     else {
        //         // send empty response for favicon.ico
        //         if (req.url === "/favicon.ico") {
        //             res.stream.respond({ ":status": 200 });
        //             res.stream.end();
        //             return;
        //         }
        //         const fileName = __dirname + req.url;
        //         sendFile(res.stream, fileName);
        //     }
        // };


        // http2.createSecureServer(serverOptions, RouterHandler).listen(PORT, () => {
        //     console.log("http2 server listening on port", PORT);
        // });