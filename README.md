<div align=center><img src="https://raw.githubusercontent.com/apporoad/LiSA.sync/master/docs/logo.png"/></div>

# LiSA.sync
sync framework for node   
LiSA.sync 不再提供默认的adapter，使用时需要采用ilink方式，使用不同的adapter  
采用ilink方式时，应用可以动态切换adapter方式，实现同步到不同的数据源  

## phil（哲学）

[phil](./phil.md)

## use

[use with lisa.sync.fileadapter](https://github.com/apporoad/LiSA.sync.fileAdapter.js.git)


## how to diy your adapter 
```js
exports.getId = (D)=>{}
exports.syncReader = (D) =>{}
exports.reader = (D)=>{}
exports.writer = (D,data)=>{}
```
just have a peek on [lisa.sync.fileadapter](https://github.com/apporoad/LiSA.sync.fileAdapter.js.git)