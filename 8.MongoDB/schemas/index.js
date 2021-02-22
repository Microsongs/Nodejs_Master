const mongoose = require('mongoose');
// connect함수가 실행되면 연결
const connect = () => {
    // 배포가 아닐떄 -> 개발할 때 debug모드를 true로 한다
    if(process.env.NODE_ENV !== 'production'){
        mongoose.set('debug',true);
    }
    // 해당 함수로 실행, localhost:27017/admin
    // 기본적인 함수 꼴 mongoose.connect('mongodb://아이디:비밀번호@localhost:27017/admin'
    // admin db는 로그인을 위한 db
    mongoose.connect('mongodb://root:nodejsbook@localhost:27017/admin',{
        dbName: 'nodejs',
        // 아래 두 개는 무조건 true
        useNewUrlParser: true,
        userCreateIndex: true,
    },(error)=>{
        if(error){
            console.log('몽고디비 연결 에러',error);
        }
        else{
            console.log('몽고디비 연결 성공');
        }
    });
};

// 아래 두 부분은 eventListener
// error일 경우 실행
mongoose.connection.on('error',(error)=>{
    console.error('몽고디비 연결 에러',error);
});

// disconnected일 경우 실행
mongoose.connection.on('disconnected',()=>{
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
    connect();
});

module.exports = connect;