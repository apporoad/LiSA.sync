const utils = require('lisa.utils')
const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')

var wr = (p,content)=>{
    fs.writeFile(p, content, { encoding:"utf8" }, function(err) {
        if (err) {
            console.error("LiSA.sync fileAdapter : " + err)
        }
    })
}

var adapter = function(){
    this.getName=D=>{
        return D.replace(/\\/g,'/')
    }

    this.syncReader = (D) =>{
        var content = fs.readFileSync(D,{encoding:"utf8"})
        if(utils.endWith(D,".json") && content){
            try{
                return JSON.parse(content)
            }
            catch(e){
                return {}
            }
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

        if(!fs.existsSync(path.dirname(D))){
            mkdirp(path.dirname(D), function (err) {
                if (err) 
                    console.error("LiSA.sync fileAdapter : " + err)
                else 
                    wr(D,content)
            });
        }
        else{
            wr(D,content)
        }

       
    }
}

module.exports = new adapter()