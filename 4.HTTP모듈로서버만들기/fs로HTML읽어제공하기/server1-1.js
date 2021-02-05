const http = require('http');

// 서버는 코드를 바꾸었을 때 재시작해야 함
http.createServer((req, res)=>{
    res.writeHead(200, { 'Content-Type': 'text/html; charset= utf-8' });
    res.write('<h1>hello Node!</h1>');
    res.write('<p>Hello Server</p>');
    res.end('<p>Hello ZeroCho</p>');
})
    .listen(8080);
    // 80번 포트는 로컬호스트로만 접속해도 됨, 대부분 컴퓨터는 80번 포트는 에러가 남
http.Server.on('listening',()=>{
    console.log('8080번 포트에서 서버 대기중입니다.');
});

http.Server.on('error',(error)=>{
    console.error(error);
})