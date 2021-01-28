const EventEmitter = require('events');

const myEvent = new EventEmitter();
myEvent.addListener('event1',()=>{
    console.log('이벤트 1');
});

myEvent.on('event2',()=>{
    console.log('이벤트 2');
})
myEvent.on('event2',()=>{
    console.log('이벤트2 추가');
})
// 한 번만 실행됨
myEvent.once('event3',()=>{
    console.log('이벤트 3');
})

myEvent.emit('event1');
myEvent.emit('event2');

myEvent.emit('event3');
myEvent.emit('event3'); // 호출 안됨

myEvent.on('event4',()=>{
    console.log('이벤트 4');
})
myEvent.removeAllListeners('event4');
myEvent.emit('event4'); // 호출 안됨

const listener = () => {
    console.log('이벤트 5');
}

myEvent.on('event5',listener);
myEvent.removeListener('event5',listener);
myEvent.emit('event5'); // 호출 안됨

console.log(myEvent.listenerCount('event2'));