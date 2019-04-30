var l_sen = new Vue({
    el: "#l_sen",
    data: {
        all_members: [],
        members: [],
        members_sorted: [],
        unsorted: [],
        percentage: 0,
        n_reps_dem: 0,
        n_reps_ind: 0,
        n_reps_rep: 0,
        med_dem: 0,
        med_rep: 0,
        med_ind: 0,
        seen:false,
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            fetch('https://api.propublica.org/congress/v1/113/senate/members.json', {
                headers: {
                    'X-API-KEY': 'Wx6bspM0cWI12xzzme2OwrtIULK1AmDW2qMQKgxD'
                }
            })
                .then(r => r.json())
                .then(json => {
                    this.members = json.results[0].members;
                    this.all_members = json.results[0].members;
                    this.calculateStat();
                    this.members_sorted = json.results[0].members;
                    this.percentatge_array_cal();
                    this.reverse_array();
                    this.seen=true;
                }).catch(error => console.log(error));
        },
        calculateStat() {
            let cont_dem = 0;
            let cont_rep = 0;
            let cont_ind = 0;
            this.all_members.forEach(function (politic) {
                if (politic.party == "D") {
                    l_sen.n_reps_dem += 1;
                    cont_dem += politic.votes_with_party_pct;
                }
                if (politic.party == "R") {
                    l_sen.n_reps_rep += 1;
                    cont_rep += politic.votes_with_party_pct;
                }
                if (politic.party == "I") {
                    l_sen.n_reps_ind += 1;
                    cont_ind += politic.votes_with_party_pct;
                }
            });
            this.percentage = (this.members.length * 10) / 100;
            this.med_dem = (cont_dem / l_sen.n_reps_dem);
            this.med_ind = (cont_ind / l_sen.n_reps_ind);
            this.med_rep = (cont_rep / l_sen.n_reps_rep);
        },
        percentatge_array_cal() {
            this.members_sorted.sort(function (first, second) {
                if (first.votes_with_party_pct < second.votes_with_party_pct) {
                    return -1;
                }
                if (first.votes_with_party_pct > second.votes_with_party_pct) {
                    return 0;
                }
                else {
                    return 1;
                }
            });
        },
        reverse_array() {
            this.unsorted = this.members_sorted.slice();
            this.unsorted.reverse();
        }
    },
});


// let party_loyal=document.getElementById("party_loyal");
// let members = data.results[0].members;
// let reps_dem=0;
// let reps_rep=0;
// let reps_ind=0;
// let med_dem=0;
// let med_rep=0;
// let med_ind=0;
// let cont_dem=0;
// let cont_rep=0;
// let cont_ind=0;

// printTable();
// function printTable(){
//     let template="";
//     members.forEach(function(politic){
//         //we need to count the average of count to divide afterwards with the number of reps
//         if(politic.party=="D"){
//             reps_dem+=1;
//             cont_dem+=politic.votes_with_party_pct;
//         }
//         if(politic.party=="R"){
//             reps_rep+=1;
//             cont_rep+=politic.votes_with_party_pct;
//         }
//         if(politic.party=="I"){
//             reps_ind+=1;
//             cont_ind+=politic.votes_with_party_pct;
//         } 
//     })
//     //we need to calculate now the medium of votes and divided by the number of senators
//     med_dem= (cont_dem/reps_dem);
//     med_ind=(cont_ind/reps_ind);
//     med_rep=(cont_rep/reps_rep);
//     template+=`<tr>
//                     <td>Republican</td>
//                     <td>${reps_rep}</td>
//                     <td>${med_rep.toFixed(2)}</td>
//                 </tr>`;
//     party_loyal.innerHTML=template;
//     template+=`<tr>
//                     <td>Democrat</td>
//                     <td>${reps_dem}</td>
//                     <td>${med_dem.toFixed(2)}</td>
//                 </tr>`;
//     party_loyal.innerHTML=template;
//     template+=`<tr>
//                     <td>Independent</td>
//                     <td>${reps_ind}</td>
//                     <td>${med_ind.toFixed(2)}</td>
//                 </tr>`;
//     party_loyal.innerHTML=template;
// }