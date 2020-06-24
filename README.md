<div align=center><img src="https://raw.githubusercontent.com/apporoad/LiSA.sync/master/docs/logo.png"/></div>

# LiSA.sync
sync framework for node   
LiSA.sync 默认的采用 fileAdapter   
使用不同的adapter时请参考示例

## phil（哲学）

[phil](./phil.md)

## use

[use with lisa.sync.fileadapter](https://github.com/apporoad/LiSA.sync.fileAdapter.js.git)
```bash
npm i --save lisa.sync
```
```js
var LiSASync = require('lisa.sync')

var LiSA = LiSASync(__dirname + '/test/LiSA.json',{internal : 2000})

console.log(LiSA.getSync())

LiSA.set({ name : "LiSA1" , gender : "girl"})

console.log(LiSA.getSync())

var index =0

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

```

## how to diy your adapter 
```js
exports.getId = (D)=>{}
exports.syncReader = (D) =>{}
exports.reader = (D)=>{}
exports.writer = (D,data)=>{}
```
## use your adapter
```js
var LiSASync = require('lisa.sync')

var yourAdapter = require('yourAdapterPath')

var LiSA = LiSASync(__dirname + '/test/LiSA.json',{internal : 2000} , yourAdapter)

```
just have a peek on [lisa.sync.fileadapter](https://github.com/apporoad/LiSA.sync.fileAdapter.js.git)   
aok adapter [aok](https://github.com/apporoad/LiSA.sync.aokAdapter.js)  
csv adapter [csv](https://github.com/apporoad/LiSA.sync.csvAdapter.js)