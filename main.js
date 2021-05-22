const i11 = document.querySelector('#i11')
const i12 = document.querySelector('#i12')
const i21 = document.querySelector('#i21')
const i22 = document.querySelector('#i22')
const s11 = document.querySelector('#s11')
const s12 = document.querySelector('#s12')
const u1 = document.querySelector('#u1')
const lght= document.querySelector("#l")
         
document.querySelectorAll('li').forEach( function(el){ 
    el.addEventListener('click', function() { 
         document.querySelector('.dropdown-toggle').innerText = el.textContent;
         if(lght.value=='') {
             let a=document.querySelector("#alert")
             a
             a.textContent = "Lenght of beam not given"
             
         }
         window.tYpE=el.textContent 
         i11.disabled=true
         i12.disabled=true
         i21.disabled=true
         i22.disabled=true
         s11.disabled=true
         s12.disabled=true
         u1.disabled=true
         if(el.textContent == 'Normal Load') iLoad()
         if(el.textContent == 'Uniform Distributed Load') iULoad()
         if(el.textContent == "Moment") iMoment()
         })
})
function iLoad(){
    i11.disabled=false
    i21.disabled=false
    u1.disabled=false
    //console.log()
}
function iULoad(){
    i11.disabled=false
    i21.disabled=false
    i22.disabled=false
    u1.disabled=false
    //console.log('Uload')
}

function iMoment(){
    i11.disabled=false
    i21.disabled=false
    s11.disabled=false
    s12.disabled=false
    u1.disabled=false
}
    
    
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

function graphit(){

const config = {
  type: 'line',
  data: {
  labels: labels,
  datasets: [{
    label: 'Shear Diagram',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: datas,
  }]
},
  options: {
      datasets: { line: { pointRadius: 0 // disable for all `'line'` datasets
       } },
  }
};



var myChart = new Chart( document.getElementById('myChart'), config );

const config2 = {
  type: 'line',
  data:{
  labels: labels,
  datasets: [{
    label: 'Moment diagram',
    backgroundColor: '#2673B8',
    borderColor: '#2673B8',
    data: data2,
  }]
},
  options: {
      datasets: { line: { pointRadius: 0 // disable for all `'line'` datasets
       } },
  }
};

 

var myChart2 = new Chart( document.getElementById('myChart2'), config2 ); 
      }