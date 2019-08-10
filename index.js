const debug = require('debug')('LiSA.sync')
const utils = require('lisa.utils')

global.LiSASYNC = global.LiSASYNC || {};
var map = global.LiSASYNC 

function Sync(D){
    var _this = this
    var _d = D
    var _data = null
    var _initFlag = false
    var _syncReader = null
    var _reader = null
    var _writer = null


    //todo auto load reader and writer

    this.get = ()=>{
        return new Promise((r,j)=>{
            if(_initFlag){
                r(_data)
            }else{
                if(_reader){
                    var result = _reader(_d)
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
                //todo into the orbit
            })
        }
        else{
            _data = value
            _initFlag = true
            //todo into the orbit
        }
    }
    this.getSync =()=>{
        if(!_initFlag) {
            if(_syncReader){
                _data = _syncReader(_d)
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

    this.setSyncReader = reader=>{ 
        //todo many validate
        _this._syncReader = reader
    }
    this.setReader = reader=>{ 
        //todo many validate
        _this._reader = reader
    }
    this.setWriter = writer=>{ 
        //todo many validate
        _this._writer = writer
    }
}



module.exports =(D)=>{
    //todo D maybe a json
    if(!map[D]){
        map[D] = new Sync(D) 
    }
    return map[D]
}