const express = require('express');
const path = require('path');

const app = express();

// app에 port라는 속성을 3천으로 세팅해준다.
app.set('port',process.env.PORT || 3000);
/////////////////////////////////////////

// 미들웨어는 (req, res, name)=>{} 함수이다.
// app.use app.get등은 그것을 실행하기 위한 틀
//아래와 같이 연속으로 사용 가능
/*
app.use((req, res, next)=>{
    console.log('1 요청에 실행하고 싶어요')
    next();
}, (req, res, next)=>{
    console.log('2 요청에 실행하고 싶어요')
    next();
}, (req, res, next)=>{
    console.log(`3 요청에 실행하고 싶어요`);
    next();
})
*/
// 에러 처리 미들웨어
app.use((req, res, next)=>{
    console.log(`1 요청에 실행하고 싶어요`);
    next();
}, (req, res, next)=>{
    throw new Error(`에러가 났어요`);
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

// 에러 처리 미들웨어, 가장 아래에 해주는 것이 좋음
// 에러 미들웨어는 반드시 4개를 전부 써주어야 함
app.use((err, req, res, next)=>{
    console.error(err);
    // 서버가 클라이언트에게 거짓말로 상태를 보낼 수 있다. 이런 것으로 보안 위험을 없앨 수 있음
    res.status(200).send(`에러났지롱, 근데 안알려주지롱`);
})
////////////////////////////////////////

app.listen(app.get('port'), ()=>{
    console.log('익스프레스 서버 실행');
});