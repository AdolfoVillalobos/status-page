"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const fs_1 = require("fs");
const checkBlogStatus_1 = require("./checkBlogStatus");
const path_1 = require("path");
const PORT = process.env.PORT || 3000;
const server = (0, http_1.createServer)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.url === '/' && req.method === 'GET') {
        const { status, color } = yield (0, checkBlogStatus_1.checkBlogStatus)();
        (0, fs_1.readFile)((0, path_1.join)(__dirname, '../static/index.html'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            const responseHtml = data
                .replace('{{status}}', status)
                .replace('{{color}}', color);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(responseHtml);
        });
    }
    else if (req.url === '/styles.css' && req.method === 'GET') {
        (0, fs_1.readFile)((0, path_1.join)(__dirname, '../static/styles.css'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
}));
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
