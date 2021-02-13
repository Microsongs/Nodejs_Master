const express = require('express');
const path = require('path');

const app = express();

// app에 port라는 속성을 3천으로 세팅해준다.
app.set('port',process.env.PORT || 3000);
/////////////////////////////////////////

// 미들웨어
app.use((req, res, next)=>{
    console.log('모든 요청에 실행하고 싶어요')
    next();
})

/////////////////////////////////////////

// 앱에 method를 붙여주는 식으로 구별 가능
app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname,'./index.html'));
});


app.post('/',(req, res)=>{
    res.send('helo express');
})

app.get('/about',(req, res)=>{
    res.send('hello express');
});

// 와일드 카드 -> :name으로 연결 가능
app.get('/category/:name',(req, res)=>{
    res.send(`hello ${req.params.name}`);
});

// get요청에 대한 어떠한 주소든지 다 처리하는 것
//이 것은 모든지 다 걸려버리므로 밑에 넣어야함
app.get('*',(req, res)=>{
    res.send(`hello Everybody`);
})

////////////////////////////////////////

app.listen(app.get('port'), ()=>{
    console.log('익스프레스 서버 실행');
});