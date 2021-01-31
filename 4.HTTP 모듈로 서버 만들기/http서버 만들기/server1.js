const http = require('http');

http.createServer((req, res)=>{
    // 응답을 거부할 수는 있음,
    res.write('<h1>hello Node!</h1>');
    res.write('<p>Hello Server</p>');
    res.end('<p>Hello ZeroCho</p>');
})
    .listen(8080, ()=>{
        console.log('8080번 포트에서 서버 대기중입니다.');
    });