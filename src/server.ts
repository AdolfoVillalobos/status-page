import { createServer, IncomingMessage, ServerResponse } from 'http';
import { readFile } from 'fs';
import { checkBlogStatus } from './checkBlogStatus';
import { join } from 'path';

const PORT = 3000;

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
    if (req.url === '/' && req.method === 'GET') {
        const { status, color } = await checkBlogStatus();
        readFile(join(__dirname, '../static/index.html'), 'utf8', (err, data) => {
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
    } else if (req.url === '/styles.css' && req.method === 'GET') {
        readFile(join(__dirname, '../static/styles.css'), (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
