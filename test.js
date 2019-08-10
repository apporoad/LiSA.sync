var LiSASync = require('./index')


var LiSA = LiSASync(__dirname + '/test/LiSA.json')


console.log(LiSA.getSync())


LiSA.set({ name : "LiSA" , gender : "girl"})

var index =0
//you can 
setInterval(() => {
    LiSA.set({ name : "LiSA" , gender : "girl" , index : index++})
}, 0);

//you can call sync 
LiSA.sync(data=>{
    data.oneNode = { name : "LiSA"}
})

//or new data
LiSA.sync(()=>{
    return {
        name : "LiSA"
    }
})


LiSA.get().then(d=>{
    console.log(d)
})