const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const app = express();
const session = require('express-session');

app.set('port',process.env.PORT || 3000);

dotenv.config();
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');


app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_SECRET,
    cookie:{
        httpOnly: true,
    },
    name: 'connect.sid',
}));

// 라우터 호출
app.use('/',indexRouter);
app.use('/user',userRouter);

// 404처리 미들웨어
app.use((req,res,next)=>{
    res.status(404).send('NOT Found');
});

// 에러처리 미들웨어
app.use((err,req,res,next)=>{
    console.error(error);
    res.status(500).send(err.message);
});

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기중');
});
