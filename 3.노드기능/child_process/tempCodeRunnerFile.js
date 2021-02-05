process.stdout.on('data',function(data){
    console.log(data.toString());
})

process.stdout.on('data',function(data){
    console.error(data.toString());
})