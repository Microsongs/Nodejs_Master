const express = require('express');
const path = require('path');
// 넌적스 사용
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

// 라우터
const indexRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express();
dotenv.config();
app.set('port',process.env.PORT || 3000);
// 넌적스 사용
app.set('view engine','html');
nunjucks.configure('views',{
    express: app,
    watch:true,
});

app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname,'./views/main.html'));
})

/*
// pug 템플릿 엔진에 대한 설정
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');
*/

// 404처리 미들웨어
app.use((req,res,next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

// 에러처리 미들웨어

app.use((err,req,res,next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기중');
});
