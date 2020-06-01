const utils = require('lisa.utils')
const fs = require('fs')
const path = require('path')

var wr = (p,content)=>{
    fs.writeFile(p, content, { encoding:"utf8" }, function(err) {
        if (err) {
            console.error("LiSA.sync fileAdapter : " + err)
        }
    })
}

exports.getId= D=>{
    return D.replace(/\\/g,'/')
}

exports.syncReader= D=>{
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
exports.reader = D=>{
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
exports.writer = (D,data)=>{
    var content = null
    if(utils.Type.isString(data)){
        content = data
    }else{
        content = JSON.stringify(data)
    }

    if(!fs.existsSync(path.dirname(D))){
        utils.mkdirp(path.dirname(D))
        wr(D,content)
        // mkdirp(path.dirname(D), function (err) {
        //     if (err) 
        //         console.error("LiSA.sync fileAdapter : " + err)
        //     else 
        //         wr(D,content)
        // });
    }
    else{
        wr(D,content)
    }
}