const http = require('http');

// 서버는 코드를 바꾸었을 때 재시작해야 함
const server = http.createServer((req, res)=>{
    res.writeHead(200, { 'Content-Type': 'text/html; charset= utf-8' });
    res.write('<h1>hello Node!</h1>');
    res.write('<p>Hello Server</p>');
    res.end('<p>Hello ZeroCho</p>');
})
    .listen(8080, ()=>{
        console.log('8080번 포트에서 서버 대기 중입니다.');
    });

const server1 = http.createServer((req, res)=>{
    res.writeHead(200, { 'Content-Type': 'text/html; charset= utf-8' });
    res.write('<h1>hello Node!</h1>');
    res.write('<p>Hello Server</p>');
    res.end('<p>Hello ZeroCho</p>');
})
    .listen(8081, ()=>{
        console.log('8081번 포트에서 서버 대기 중입니다.');
    });
    