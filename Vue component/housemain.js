//we create the component for the template of the vue
Vue.component('t_members', {
    props: ['member'],
    template:
        `<tr>
        <td><a :href="member.url" data-lightbox="image-1" data-title="My caption">{{member.first_name}} {{member.middle_name || ""}} {{member.last_name}}</a></td>
            <td>{{member.party}}</td>
            <td>{{member.state}}</td>
            <td>{{member.seniority}}</td>
            <td>{{member.votes_with_party_pct}}</td>
        </tr>`,
});
//we create now the instance of vue
//inside we are going to have the array as named data to members array
var app = new Vue({
    el: '#app_house',
    data: {
        all_members: [],
        members: [],
        selected: [],
        optioned: "All",
        states: [],
        checked_name: 0,
        checked_state: 0,
        checked_party: 0,
        checked_seniority: 0,
        checked_percentage: 0,
        seen: false,
        search: "",
        //create an array to get the options in the checkbox
    }, //array of members
    created() {
        this.getData();
    },
    methods: {
        getData() {
            fetch('https://api.propublica.org/congress/v1/113/house/members.json', {
                headers: {
                    'X-API-KEY': 'Wx6bspM0cWI12xzzme2OwrtIULK1AmDW2qMQKgxD'
                }
            })
                .then(r => r.json())
                .then(json => {
                    this.members = json.results[0].members;
                    this.all_members = json.results[0].members;
                    this.seen = true;
                })
        },
        test(argument) {
            if (argument == "name") {
                this.checked_name += 1;
                if (this.checked_name % 2 == 0) {
                    this.showmembers.sort((a, b) => (a.first_name < b.first_name) ? 1 : ((b.first_name < a.first_name) ? -1 : 0));
                } else {
                    this.showmembers.sort((a, b) => (a.first_name > b.first_name) ? 1 : ((b.first_name > a.first_name) ? -1 : 0));
                }
            }
            else if (argument == "party") {
                this.checked_party += 1;
                if (this.checked_party % 2 == 0) {
                    this.showmembers.sort((a, b) => (a.party < b.party) ? 1 : ((b.party < a.party) ? -1 : 0));
                }
                else {
                    this.showmembers.sort((a, b) => (a.party > b.party) ? 1 : ((b.party > a.party) ? -1 : 0));
                }
            }
            else if (argument == "state") {
                this.checked_state += 1;
                if (this.checked_state % 2 == 0) {
                    this.showmembers.sort((a, b) => (a.state < b.state) ? 1 : ((b.state < a.state) ? -1 : 0));
                }
                else {
                    this.showmembers.sort((a, b) => (a.state > b.state) ? 1 : ((b.state > a.state) ? -1 : 0));
                }
            }
            else if (argument == "seniority") {
                this.checked_seniority += 1;
                if (this.checked_seniority % 2 == 0) {
                    this.showmembers.sort((a, b) => b.seniority - a.seniority);
                }
                else {
                    this.showmembers.sort((a, b) => a.seniority - b.seniority);
                }
            }
            else if (argument == "percentage") {
                this.checked_percentage += 1;
                if (this.checked_percentage % 2 == 0) {
                    this.showmembers.sort((a, b) => (a.votes_with_party_pct > b.votes_with_party_pct) ? 1 : ((b.votes_with_party_pct > a.votes_with_party_pct) ? -1 : 0));
                }
                else {
                    this.showmembers.sort((a, b) => (a.votes_with_party_pct < b.votes_with_party_pct) ? 1 : ((b.votes_with_party_pct < a.votes_with_party_pct) ? -1 : 0));
                }
            }
        },
    },
    computed: {
        showmembers() {
            this.members = this.all_members;
            console.log(this.search);
            //we need to do two blocks of bolleans to get the filters together
            if ((this.selected.length == 0) && (this.optioned == "All")) {
                //if selected is empty we need to show the entire table
                if (this.search.length != 0) {
                    return this.members.filter(member => {
                        return (member.first_name.toLowerCase().includes(this.search.toLowerCase())) || (member.last_name.toLowerCase().includes(this.search.toLowerCase()));
                    })
                } else {
                    return this.members;
                }
            }
            else {
                return this.members.filter(function (politic) {
                    return (app.selected.includes(politic.party) || app.selected.length == 0) && (politic.state == app.optioned || app.optioned == "All")
                });
            }
        },
        getOptions() {
            let NoDup = [];
            this.members.forEach(function (st) {
                NoDup.push(st.state);
            })
            NoDup.sort();
            return this.states = [...new Set(NoDup)];
        }
    }
});







// let house_data=document.getElementById("house_data");
// let members = data.results[0].members;
// //we create function that will an array 
// let click=document.getElementById("checkbox_click");
// document.getElementById("selector").addEventListener("change",tablefiltered);
// //create an array that will have the values of the checkbox clicked
// let list = [];

// let gent = data.results[0].array;
// printTable();
// function printTable(){
//     for(let i =0;i<members.length;i++){
//         //crear las filas
//         let row= document.createElement("tr");
//         row.insertCell().innerHTML= (members[i].first_name+ " "+(members[i].middle_name||"")+" "+members[i].last_name).link(members[i].url);
//         row.insertCell().innerHTML=members[i].party;
//         row.insertCell().innerHTML=members[i].state;
//         row.insertCell().innerHTML= members[i].seniority;
//         row.insertCell().innerHTML=members[i].votes_with_party_pct+ "%";
//         //pone la fila en la tabla
//         house_data.append(row);
//     }
// }

// //now we have to show the table comparing the values of the list
//  function tablefiltered(){
//     list = Array.from(document.querySelectorAll("input[name=Political]:checked")).map(element=>element.value);
//     let select = document.getElementById("selector").value;
//     //now we need to check and show the table
//     let printmembers=[];
//     if(list.length==0){
//         list.push("R");
//         list.push("D");
//         list.push("I");
//     }
//     members.forEach(function(pol){
//         //now we need to check if selecyor has been pressed with one state
//         if(select=="All"){
//             if(list.includes(pol.party)){
//                 printmembers.push(pol);
//             }
//         }else{
//             if(list.includes(pol.party) && (pol.state==select)){
//                 printmembers.push(pol);
//             }
//         }
//     })
//     //console.log(printmembers);
//     printnewtable(printmembers);
//  }
//  function printnewtable(array){
//     let template="";
//     if(array.length==0){
//     template+=`<div class="alert alert-danger" role="alert">ALERT!!!! THERE IS NO SENATOR IN THAT AREA WITH THAT PARTY</div>`;
//    }else{
//        array.forEach(function(member){
//         template+=` <tr>
//                         <td><a href="${member.url}">${member.first_name} ${member.middle_name||""} ${member.last_name}</a></td>
//                         <td>${member.party}</td>
//                         <td>${member.state}</td>
//                         <td>${member.seniority}</td>
//                         <td>${member.votes_with_party_pct}</td>
//                     </tr>`;
//     })} 
//     house_data.innerHTML=template;
//  }
