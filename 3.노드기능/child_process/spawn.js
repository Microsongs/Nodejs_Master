const spawn = require('child_process').spawn;

const process = spawn('python',['test.py']);

process.stdout.on('data',function(data){
    console.log(data.toString());
    console.log("dd");
})

process.stdout.on('data',function(data){
    console.error(data.toString());
})