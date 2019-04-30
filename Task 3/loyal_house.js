let party_house=document.getElementById("party_house");
let members = data.results[0].members;
let reps_dem=0;
let reps_rep=0;
let reps_ind=0;
let med_dem=0;
let med_rep=0;
let med_ind=0;
let cont_dem=0;
let cont_rep=0;
let cont_ind=0;

printTable();
function printTable(){
    let template="";
    members.forEach(function(politic){
        //we need to count the average of count to divide afterwards with the number of reps
        if(politic.party=="D"){
            reps_dem+=1;
            cont_dem+=politic.votes_with_party_pct;
        }
        if(politic.party=="R"){
            reps_rep+=1;
            cont_rep+=politic.votes_with_party_pct;
        }
        if(politic.party=="I"){
            reps_ind+=1;
            cont_ind+=politic.votes_with_party_pct;
        } 
    })
    //we need to calculate now the medium of votes and divided by the number of senators
    med_dem= (cont_dem/reps_dem);
    med_ind=(cont_ind/reps_ind);
    med_rep=(cont_rep/reps_rep);
    template+=`<tr>
                    <td>Republican</td>
                    <td>${reps_rep}</td>
                    <td>${med_rep.toFixed(2)}</td>
                </tr>`;
    party_house.innerHTML=template;
    template+=`<tr>
                    <td>Democrat</td>
                    <td>${reps_dem}</td>
                    <td>${med_dem.toFixed(2)}</td>
                </tr>`;
    party_house.innerHTML=template;
    template+=`<tr>
                    <td>Independent</td>
                    <td>${reps_ind}</td>
                    <td>${med_ind.toFixed(2)}</td>
                </tr>`;
    party_house.innerHTML=template;
}