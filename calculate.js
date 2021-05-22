labels=[]
datas=[]
data2=[]

collect = []
unknown = []
collect.promote = function(){
    for (i=0; i<collect.length;i++){
        collect[i].promote()
    }
}

unknown.solve = function(){
    function doIt(i,k){
        rmnt=0
        for(j=0;j<collect.length;j++){
            rmnt+=collect[j].result(unknown[i].dis)
        }
        let D = (unknown[i].dis-unknown[k].dis)
    unknown[k].mag=rmnt/(D)
    collect.push(unknown[k])
    
    }
    doIt(0,1)
    doIt(1,0)
    
}

class loadCal{
    constructor(mag = 0,dis){
        this.mag = mag
        this.dis = dis
    }
    cal(i){
        if(i >= this.dis){
            if(this.id == 0) return this.mag
            if(this.id == 1) return this.mag*(i - this.dis)
            if(this.id == 2) return 0.5*this.mag*(i - this.dis)**2
        }
        else return 0
    }
    promote() { this.id += 1 }
}


class load extends loadCal{
    constructor(mag,dis){
        super(mag,dis)
        this.id = 0
    }
    result(r){
    let m=this.mag, d=this.dis
    let rdis = d-r
    //if(d>r) rdis=-1*rdis
    return m*rdis
    }
}

class uniLoad extends loadCal{
    constructor(mag,dis,dis2){
        super(mag,dis)
        this.dis2 = dis2
        this.id = 1
    }
    result(r){
    let m=this.mag*(this.dis2-this.dis), d=(this.dis2+this.dis)/2
    let rdis = d-r
    return m*rdis
    }
}

class moment extends loadCal{
    constructor(mag,dis){
        super(mag,dis)
        this.id = -1
    }
    result(r){
    return this.mag
    }
}



function aDd(){
         let j11 = Number(document.querySelector('#i11').value)
         let j12 = Number(document.querySelector('#i12').value)
         let j21 = Number(document.querySelector('#i21').value)
         let j22 = Number(document.querySelector('#i22').value)
         let t11 = document.querySelector('#s11')
         let t12 = document.querySelector('#s12')
         let v1 = document.querySelector('#u1')


    if(v1.checked == true){
        if(window.tYpE=="Normal Load") unknown.push(new load(0,j21))
        if(window.tYpE=="Uniform Distributed Load") unknown.push(new uniLoad(0,j21,j22))
    }
    else {
        if(window.tYpE=="Normal Load") collect.push(new load(j11,j21))
        if(window.tYpE=="Uniform Distributed Load") collect.push(new uniLoad(j11,j21,j22))
        if(window.tYpE=="Moment")
collect.push(new moment(j11,j21))
    }
}
function sUb(){
unknown.solve()

for(i=0; i<=Number(lght.value); i+=0.1){
    sum = 0
    for(j=0; j<collect.length; j++){
        sum+=collect[j].cal(i)
    }
    labels.push(i.toFixed(2))
    datas.push(sum.toFixed(2))
}
collect.promote()
for(i=0; i<=Number(lght.value); i+=0.1){
    sum = 0
    for(j=0; j<collect.length; j++){
        sum+=collect[j].cal(i)
    }
    data2.push(sum.toFixed(2))
}

graphit()}