const debug = require('debug')('LiSA.sync')
const utils = require('lisa.utils')
const orbit = require("lisa.orbit")
const io = require('./io')

global.LiSASYNC = global.LiSASYNC || {};
var map = global.LiSASYNC 

function Sync(D,options){
    options = options || {}
    var _this = this
    var _d = D
    var _data = null
    var _initFlag = false
    //var _syncReader = null
    //var _reader = null
    //var _writer = null
    var _adapter = null

    

    this.get = ()=>{
        return new Promise((r,j)=>{
            if(_initFlag){
                r(_data)
            }else{
                if(_adapter._reader){
                    var result = _adapter._reader(_d)
                    if(result && result.then){
                        result.then(data=>{
                            _data = data
                            _initFlag=true
                            r(data)
                        })
                    }
                    else{
                        _data = result
                        _initFlag = true
                        r(result)
                    }
                }else{
                    console.error('LiSA.sync you must set reader')
                    throw Error('LiSA.sync you must set reader')
                }
            }
        })
    }
    this.set = value =>{
        //support async
        if(value && value.then){
            value.then(data=>{
                _data = data
                _initFlag = true
                //into the orbit
                orbit.push(_adapter.getName(_d))
            })
        }
        else{
            _data = value
            _initFlag = true
            //into the orbit
            orbit.push(_adapter.getName(_d))
        }
    }
    this.getSync =()=>{
        if(!_initFlag) {
            if(_adapter._syncReader){
                _data = _adapter._syncReader(_d)
                _initFlag = true
            }
            else{
                debug('your data uninited,and you need set the syncReader')
            }
        }
        return _data
    }
    this.sync=fn=>{
        if(fn){
            if(utils.Type.isFunction(fn)){
                _this.set(fn)
            }else{
                var maybeResult= fn(_this.getSync())
                if(maybeResult){
                    _this.set(maybeResult)
                }else{
                    _this.set(_data)
                }
            }
        }
    }

    this.setAdapter = adapter=>{
        //todo validate
        _this._adapter = adapter
    }


    //use orbit
    orbit.setOrbit(_adapter.getName(_d),null,mina=>{
        if(_adapter._writer)
            _adapter._writer(_d,_data)
        else{
            console.error("LiSA.sync  you should set Writer")
        }
    },_d,options.internal)
}



module.exports =(D,options)=>{
    var adapter = io.getAdapter(D)
    if(!map[adapter.getName(D)]){
         var sync = new Sync(D,options) 
         sync.setAdapter = adapter
         map[adapter.getName(D)] = sync
    }
    return map[adapter.getName(D)]
}