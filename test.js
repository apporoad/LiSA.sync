var LiSASync = require('./index')


var LiSA = LiSASync(__dirname + '/test/LiSA.json')

LiSA.get().then(d=>{
    console.log(d)
})

LiSA.set({ name : "LiSA" , gender : "girl"})

var index =0
//your can 
setInterval(() => {
    LiSA.set({ name : "LiSA" , gender : "girl" , index : index++})
}, 0);