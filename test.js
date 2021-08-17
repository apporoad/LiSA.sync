var LiSASync = require('./index')

var LiSA = LiSASync(__dirname + '/LiSA.json',{internal : 2000})



LiSA.set({ name : "LiSA1" , gender : "girl"})

console.log(LiSA.getSync())

console.log(LiSA.getSync())

var index =0
//you can 
// setInterval(() => {
//     LiSA.set({ name : "LiSA" , gender : "girl" , index : index++})
// }, 0);

//or new data
LiSA.sync(()=>{
    return {
        name : "LiSA2"
    }
})

console.log(LiSA.getSync())

//you can call sync 
LiSA.sync(data=>{
    data.oneNode = { name : "testNode"}
})

LiSA.get().then(d=>{
    console.log(d)
})

//stop sync
LiSA.stop()