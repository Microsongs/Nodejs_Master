// 기존 방법
function findAndSaveUser(Users){
    Users.findOne({})
        .then((user)=>{
            user.name = 'zero';
            return user.save();
        })
        .then((user)=>{
            return Users.findOne({gender:'m'});
        })
        .then((user)=>{
            // 생략
        })
        .catch(err => {
            console.error(error);
        });
}

// await과 async 사용
// 실행 순서가 오른쪽에서 왼쪽으로(<-)
// try/catch로 예외처리
async function findAndSaveUsers(Users){
    try{
        let user = await Users.findOne({});
        user.name = 'zero';
        user = await user.save();
        user = await Users.findOne({gender:'m'});
        // 생략
    }
    catch(error){
        console.error(error);
    }
}

// for await of
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
(async ()=>{
    for await (promise of [promise1, promise2]){
        console.log(promise);
    }
})();