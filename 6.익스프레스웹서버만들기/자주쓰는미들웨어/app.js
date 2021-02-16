const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

app.set('port',process.env.PORT || 3000);
// 파일들의 실행 순서도 중요함

// 개발시 dev 배포시 combined
app.use(morgan('dev'));

// app.use('요청 경로',express.static('실제 경로')) static은 파일을 찾으면 next를 실행 안함
app.use('/',express.static(path.join(__dirname, 'public')));
// 쿠키를 파싱
app.use(cookieParser());
// signedCookies에서 사용
app.use(cookieParser('zerochopassword'));
// 세션 사용
app.use(session({
    resave: false,
    saveUnitialized: false,
    secret: 'zerochopassword',
    cookie:{
        httpOnly: true,
    },
    name: 'connect.sid',
}));

const multer = require('multer');
const fs = require('fs');

try{
    fs.readdirSync('uploads');
}
catch(error){
    console.error('uploads 폴더가 없어 uploads폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}
const upload = multer({
    // 어디에 저장하는지 설정(메모리 / 디스크 등)
    storage: multer.diskStorage({
        // 어디에 저장할지(행선지)
        destination(req, file, done){
            done(null, 'uploads/');
        },
        filename(req, file, done){
            // 확장자 추출
            const ext = path.extname(file.originalname);
            // 
            done(null, path,basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    // 파일 개수, 파일 크기
    limits: {fileSize: 5 * 1024 * 1024 },
});
// 업로드 객체를 라우터에 장착
app.get('/upload',(req, res)=>{
    res.sendFile(path.join(__dirname, 'multipart.html'));
});
app.post('/upload',upload.single('image'),(req, res)=>{
    console.log(req.file);
    res.send('ok');
});

// 정적 파일 전송
// body-parser가 사라지면서 사용
app.use(express.json());
app.use(express.urlencoded({extended: true }));
//app.use('/',express.static(__dirname,'public'));

app.use((req, res, next)=>{
    //req는 동일하므로 아래 req에서 활용 가능, 요청 종료후 삭제
    req.data = '데이터 넣기;'
});

app.get('/',(req, res, next)=>{
    // 미들웨어 확장하기 -> 미들웨어 내 미들웨어
    // 로그인을 했다면 사진전송,안했다면 다음꺼로
    /*
    if(req.session.id)
        expresss.static(__dirname, 'public')(req, res, next);
    else
        next();
    */
    console.log(req.data);
    /*
    req.cookies // { mycookie: 'test' }
    // 암호를 넣었을 때 쿠키를 암호화
    req.signedCookies;
    // // 'Set-Cookie' : `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`, 와 동일함
    res.cookie('name', encodeURIComponent(name),{
        expires: new Date(),
        httpOnly: true,
        path: '/',
    });
    // 쿠키 삭제
    res.clearCookie('name', encodeURIComponent(name),{
        httpOnly: true,
        path: '/',
    });
    */
    // req.session은 그 사용자에 대한 고유한 세션 -> 개인의 요청마다 개인의 저장공간을 만들어 줌
    req.session.id = 'hello';
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/',(req,res)=>{
    res.send('hello express!');
});

app.get('/category/javascript',(req,res)=>{
    res.send('hello Javascript');
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
    // 모든 에러는 이곳에서 처리
    res.status(200).send(`에러났지롱, 근데 안알려주지롱`);
})
////////////////////////////////////////

app.listen(app.get('port'), ()=>{
    console.log('익스프레스 서버 실행');
});