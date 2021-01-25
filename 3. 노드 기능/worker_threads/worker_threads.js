const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const {worker} = require('cluster');

// 메인 스레드
// 메인 스레드에서 일을 여러개 워커 스레드로 분배를 해주고,
// 그것을 합치는 것도 직접 해야 함
if(isMainThread){
    const threads = new Set();
    threads.add(new Worker(__filename, {
        workerData: { start: 1 },
    }));
    threads.add(new Worker(__filename, {
        workerData: { start: 2 },
    }));
    for( let worker of threads){
        worker.on('message',(value)=> console.log('워커로부터', value));
        worker.on('exit', () => {
            threads.delete(worker);
            // 일이 마무리 됨을 알려줌
            if(threads.size === 0){
                console.log('워커 끝~');
            }

        });
    }

}
// 워커 스레드
else{
    const data = workerData;
    parentPort.postMessage(data.start + 100);

}