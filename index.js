var debug = ()=>{}
try{
  debug = require('debug')('LiSA.sync')
}catch(e){}
const utils = require('lisa.utils')
const orbit = require("lisa.orbit")

global.LiSASYNC = global.LiSASYNC || {};
var map = global.LiSASYNC 

function Sync(D,options){
    options = options || {}
    options.internal = options.internal || 2000
    var _this = this
    var _d = D
    var _data = null
    var _initFlag = false
    var _lastChangeTime =null

    //var _syncReader = null
    //var _reader = null
    //var _writer = null

    this.get = ()=>{
        return new Promise((r,j)=>{
            if(_initFlag){
                r(_data)
            }else{
                if(_this._adapter.reader){
                    var startTime =Date.now()
                    var result = _this._adapter.reader(_d,options)
                    if(result && result.then){
                        result.then(data=>{
                            if(startTime> _lastChangeTime)
                                _data = data
                            _initFlag=true
                            r(data)
                        })
                    }
                    else{
                        if(startTime> _lastChangeTime)
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
                _lastChangeTime = Date.now()
                _data = data
                _initFlag = true
                //into the orbit
                orbit.push(_this._adapter.getId(_d))
            })
        }
        else{
            _lastChangeTime = Date.now()
            _data = value
            _initFlag = true
            //into the orbit
            orbit.push(_this._adapter.getId(_d))
        }
    }
    this.stop = () => {
        orbit.stop(_this._adapter.getId(_d))
    }

    this.getSync =()=>{
        if(!_initFlag) {
            if(_this._adapter.syncReader){
                _data = _this._adapter.syncReader(_d,options)
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
            if(!utils.Type.isFunction(fn)){
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

        //use orbit
        orbit.setOrbit(_this._adapter.getId(_d),null,mina=>{
            if(_this._adapter.writer)
                _this._adapter.writer(_d,_data,options)
            else{
                console.error("LiSA.sync  you should set Writer")
            }
        },_d,options.internal)
    }
}

module.exports =(D,options,adapter)=>{
    var adapter = adapter || require('./adapter')//io.getAdapter(D)
    if(!map[adapter.getId(D)]){
         var sync = new Sync(D,options) 
         sync.setAdapter(adapter)
         map[adapter.getId(D)] = sync
    }
    return map[adapter.getId(D)]
}