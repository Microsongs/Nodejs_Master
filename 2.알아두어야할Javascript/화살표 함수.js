function add1(x, y){
    return x + y;
}

// add1을 화살표 함수로 나타냄
const add2 = (x,y) => {
    return x + y;
}
// return만 있는 경우 생략 가능
const add3 = (x,y) => x + y;
// return이 생략된 경우 본문을 소괄호로 감싸줄 수 있음
const add4 = (x,y) => (x + y);
// 아래 두 함수는 동일한 기능
function not1(x){
    return !x;
}
const not2 = x => !x;

let relationship1 = {
    name:'zero',
    friends: ['nero','hero','xero'],
    logFriends: function(){
        var that = this;
        this.friends.forEach(function(friend){
            console.log(that.name, friend);
        })
    }
}
relationship1.logFriends();
const relationship2 = {
    name: 'zero',
    friends: ['nero','hero','xero'],
    logFriends(){
        this.friends.forEach(friend => {
            console.log(this.name, friend);
        })
    }
}

relationship2.logFriends();