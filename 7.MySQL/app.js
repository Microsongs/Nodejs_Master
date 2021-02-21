const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const { sequelize } = require('./models');
const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');

const app = express();
app.set('port',process.env.PORT || 3001);
app.set('view engine','html');
nunjucks.configure('views',{
    express: app,
    watch: true,
});
// 시퀄라이저 싱크 -> 시퀄라이즈를 통해 노드에서 db 연결
sequelize.sync({ force:false })
    .then(()=>{
        console.log('데이터베이스 연결 성공');
    })
    .catch((err)=>{
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// 라우터 연결
app.use('/',indexRouter);
app.use('/users',usersRouter);
app.use('/comments',commentsRouter);

// 에러 처리 미들웨어
app.use((req, res, next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
// 에러 처리 미들웨어
app.use((err,req,res,next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

// 서버 실행
app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'빈 포트에서 대기 중');
});