const { Worker, isMainThread, parentPort } = require('worker_threads');

// 메인 스레드
// 메인 스레드에서 일을 여러개 워커 스레드로 분배를 해주고,
// 그것을 합치는 것도 직접 해야 함
if(isMainThread){
    const worker = new Worker(__filename);
    worker.on('message',(value)=> console.log('워커로부터', value));
    worker.on('exit', () => console.log('워커 끝~'));
    worker.postMessage('ping');
}
// 워커 스레드
else{
    parentPort.on('message', (value)=>{
        console.log('부모로부터', value);
        parentPort.postMessage('pong');
        parentPort.close();
    })
}