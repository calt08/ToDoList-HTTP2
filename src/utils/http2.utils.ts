import * as fs from 'fs';
import * as mime from 'mime';
import * as http2 from 'http2';

const sendFile = function (stream: http2.ServerHttp2Stream, fileName: string) {
    const fd = fs.openSync(fileName, "r");
    const stat = fs.fstatSync(fd);
    const headers = {
        "content-length": stat.size,
        "last-modified": stat.mtime.toUTCString(),
        // "content-type": mime.getType(fileName)
    };
    stream.respondWithFD(fd, headers);
    stream.on("close", () => {
        console.log("closing file", fileName);
        fs.closeSync(fd);
    });
    stream.end();
};

const pushFile = (stream: http2.ServerHttp2Stream, path: string, fileName: string) => {
    stream.pushStream(
        { ":path": path },
        (pushStream) => {
            sendFile(pushStream, fileName);
        });
};

export { sendFile, pushFile };