const express = require('express');

const app = express();

// app에 port라는 속성을 3천으로 세팅해준다.
app.set('port',process.env.PORT || 3000);

/////////////////////////////////////////
// 앱에 method를 붙여주는 식으로 구별 가능
app.get('/',(req, res)=>{
    res.send('hello express');
});

app.post('/',(req, res)=>{
    res.send('helo express');
})

app.get('/about',(req, res)=>{
    res.send('hello express');
});
////////////////////////////////////////

app.listen(app.get('port'), ()=>{
    console.log('익스프레스 서버 실행');
});