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
    
    


