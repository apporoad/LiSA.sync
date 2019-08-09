


function Sync(D){
    var _this = this
    this.get = ()=>{}
    this.set = value =>{}

    this.setReader = reader=>{}
    this.setWriter = writer=>{}
}



module.exports =(D)=>{
    return new Sync(D)
}