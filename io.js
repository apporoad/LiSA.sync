const utils = require('lisa.utils')

/**
 * an adapter maybe
 */
function Adapter(){
    this.getName = (D)=>{}
    this.syncReader = (D) =>{}
    this.reader = (D)=>{}
    this.writer = (D,data)=>{}
}


exports.getAdapter= D=>{
    if(utils.Type.isString(D)){
        if(utils.startWith(D,"http")){
            //todo next
            console.error("LiSA.sync default not support http")
            throw new Error("LiSA.sync default not support http")
        }
        else{
            return require('./adapters/fileAdapter')
        } 
    }else{
        console.error("LiSA.sync default not support other format D")
        throw new Error("LiSA.sync default not support other format D")
    }
    
}