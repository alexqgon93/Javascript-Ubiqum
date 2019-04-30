let select=document.getElementById("selector");
let mem = data.results[0].members;
var states = [];

//Function that will get the states in the states's array
    for(let i = 0; i<mem.length; i++){ 
        states.push(mem[i].state);
    }
    //Order the array to extract the states that are repeated
    states.sort();
    let noDup = [...new Set(states)];
    let template="";
    template+=`<option value="All">All</option>`;
    for(let i=0;i<noDup.length;i++){
        let value=noDup[i];
        template+=`<option value="${value}">${value}</option>`; 
    }
    //console.log(template);
    select.innerHTML=template;
