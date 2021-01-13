// 예시
const promise = new Promise((resolve, reject) => {
    if (condition){
        resolve('성공');
    }
    else{
        reject('실패');
    }
})
promise
    .then((message) => {
        console.log(message);
    })
    .catch((error)=>{
        console.error(error);
    })
    .finally(()=>{
        console.log('무조건')
    })

// 콜백 사용 시
function findAndSaveUser(Users){
    Users.findOne({}, (err, user)=>{    // 첫 번째 콜백
        if(err)
            return console.error(err);
        user.name = 'zero';
        user.save((err) => {
            if(err) // 두 번째 콜백
                return console.error(err);
            Users.findOne({gender:'m'}, (err, user)=>{  // 세 번째 콜백
                // 생략
            });
        });
    });
}

// 프로미스 사용 시
function findAndSaveUser(Users){
    Users.findOne({})
        .then((user) => {
            user.name = 'zero';
            return user.save();
        })
        .then((user)=>{
            return Users.findOne({gender : 'm'});
        })
        .then((user) => {
            // 생략
        })
        .catch(err => {
            console.error(err);
        });
}

// 여러 개의 프로미스를 동시에 실행
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
const promise3 = Promise.reject('실패1');
Promise.all([promise1, promise2])
    .then((result) => {
        console.log(result);    // ['성공1', '성공2']
    })
    .catch((error)=>{
        console.error(error);
    })