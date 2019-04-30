let house_data=document.getElementById("house_data");
let members = data.results[0].members;
//we create function that will an array 
let click=document.getElementById("checkbox_click");
document.getElementById("selector").addEventListener("change",tablefiltered);
//create an array that will have the values of the checkbox clicked
let list = [];

let gent = data.results[0].array;
printTable();
function printTable(){
    for(let i =0;i<members.length;i++){
        //crear las filas
        let row= document.createElement("tr");
        row.insertCell().innerHTML= (members[i].first_name+ " "+(members[i].middle_name||"")+" "+members[i].last_name).link(members[i].url);
        row.insertCell().innerHTML=members[i].party;
        row.insertCell().innerHTML=members[i].state;
        row.insertCell().innerHTML= members[i].seniority;
        row.insertCell().innerHTML=members[i].votes_with_party_pct+ "%";
        //pone la fila en la tabla
        house_data.append(row);
    }
}

//now we have to show the table comparing the values of the list
 function tablefiltered(){
    list = Array.from(document.querySelectorAll("input[name=Political]:checked")).map(element=>element.value);
    let select = document.getElementById("selector").value;
    //now we need to check and show the table
    let printmembers=[];
    if(list.length==0){
        list.push("R");
        list.push("D");
        list.push("I");
    }
    members.forEach(function(pol){
        //now we need to check if selecyor has been pressed with one state
        if(select=="All"){
            if(list.includes(pol.party)){
                printmembers.push(pol);
            }
        }else{
            if(list.includes(pol.party) && (pol.state==select)){
                printmembers.push(pol);
            }
        }
    })
    //console.log(printmembers);
    printnewtable(printmembers);
 }
 function printnewtable(array){
    let template="";
    if(array.length==0){
    template+=`<div class="alert alert-danger" role="alert">ALERT!!!! THERE IS NO SENATOR IN THAT AREA WITH THAT PARTY</div>`;
   }else{
       array.forEach(function(member){
        template+=` <tr>
                        <td><a href="${member.url}">${member.first_name} ${member.middle_name||""} ${member.last_name}</a></td>
                        <td>${member.party}</td>
                        <td>${member.state}</td>
                        <td>${member.seniority}</td>
                        <td>${member.votes_with_party_pct}</td>
                    </tr>`;
    })} 
    house_data.innerHTML=template;
 }
