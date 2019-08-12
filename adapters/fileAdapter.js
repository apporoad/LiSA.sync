const utils = require('lisa.utils')
const fs = require('fs')

var adapter = function(){
    this.getName=D=>{
        return D
    }

    this.syncReader = (D) =>{
        var content = fs.readFileSync(D,{encoding:"utf8"})
        if(utils.endWith(D,".json")){
            return JSON.parse(content)
        }
        else 
            return content
    }
    this.reader = (D)=>{
        return new Promise((r,j)=>{
            fs.readFile(D,function(err,data){
                if(err){
                    j(err)
                }else{
                    if(utils.endWith(D,".json")){
                        r(JSON.parse(data))
                    }
                    else 
                        r(data)
                }
            })
        })

    }
    this.writer = (D,data)=>{
        var content = null
        if(utils.Type.isString(data)){
            content = data
        }else{
            content = JSON.stringify(data)
        }
        fs.writeFile(D,content)
    }
}

module.exports = new adapter()