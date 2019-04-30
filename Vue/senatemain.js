//we create now the instance of vue
//inside we are going to have the array as named data to members array
var app = new Vue({
    el: '#app_senate',
    data: {
        all_members: [],
        members: [],
        selected: [],
        optioned: "All",
        states: [],
        checked: [],
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
            fetch('https://api.propublica.org/congress/v1/113/senate/members.json', {
                headers: {
                    'X-API-KEY': 'Wx6bspM0cWI12xzzme2OwrtIULK1AmDW2qMQKgxD'
                }
            })
                .then(r => r.json())
                .then(json => {
                    this.members = json.results[0].members;
                    this.all_members = json.results[0].members;
                    this.seen = true;
                }).catch(error => console.log(error))
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









/*
let senate_data = document.getElementById("senate_data");
var data;
//we are going to get the json from the server to get the info updated
fetch('https://api.propublica.org/congress/v1/113/senate/members.json', {
    headers: {
        'X-API-KEY': 'Wx6bspM0cWI12xzzme2OwrtIULK1AmDW2qMQKgxD'
    }
}).then(function (r) {
    return r.json();
}).then(function (myjson) {
    data = myjson;
    var members = data.results[0].members;
    let select = document.getElementById("selector");

    //Listeners
    document.getElementById("Polictical_1").addEventListener("change", options);
    document.getElementById("Polictical_2").addEventListener("change", options);
    document.getElementById("Polictical_3").addEventListener("change", options);
    document.getElementById("selector").addEventListener("change", options);
    //now we need to know if there is a change on the selector
    //document.getElementById("selector").addEventListener("change",function(){tablefiltered(members, select);});
    //now we need to call the functions to get the tables in place
    //first we print the whole table
    printTable();
    //print the whole states in the selector
    getStates();

    function printTable() {
        let template = "";
        members.forEach(function (member) {
            template += `
        <tr>
            <td><a href="${member.url}">${member.first_name} ${member.middle_name || ""} ${member.last_name}</a></td>
            <td>${member.party}</td>
            <td>${member.state}</td>
            <td>${member.seniority}</td>
            <td>${member.votes_with_party_pct}</td>
          </tr>`;
        });
        senate_data.innerHTML = template;
    }
    function getStates() {
        let states = [];
        for (let i = 0; i < members.length; i++) {
            states.push(members[i].state);
        }
        //Order the array to extract the states that are repeated
        states.sort();
        let noDup = [...new Set(states)];
        let template = "";
        template += `<option value="All">All</option>`;
        for (let i = 0; i < noDup.length; i++) {
            let value = noDup[i];
            template += `<option value="${value}">${value}</option>`;
        }
        select.innerHTML = template;
    }
    function options() {
        let repCb = document.getElementById("Polictical_1");
        let demCb = document.getElementById("Polictical_2");
        let indCb = document.getElementById("Polictical_3");
        let selector = document.getElementById("selector").value;
        let checkeados = [];

        if (repCb.checked) {
            checkeados.push("R");
        }

        if (demCb.checked) {
            checkeados.push("D");
        }

        if (indCb.checked) {
            checkeados.push("I");
        }

        if (!repCb.checked && !demCb.checked && !indCb.checked) {
            checkeados.push("R");
            checkeados.push("D");
            checkeados.push("I");
        }
        let membersToPrint = [];
        console.log(selector);
        members.forEach(function (member) {
            if (checkeados.includes(member.party) && ((member.state == selector) || (selector == "All"))) {
                membersToPrint.push(member);
            }
        });
        printNewTable(membersToPrint);
    }
    function printNewTable(array) {
        let template = "";
        if (array.length == 0) {
            template += `<div class="alert alert-danger" role="alert">ALERT!!!! THERE IS NO SENATOR IN THAT AREA WITH THAT PARTY</div>`;
        } else {
            array.forEach(function (member) {
                template += ` <tr>
                            <td><a href="${member.url}">${member.first_name} ${member.middle_name || ""} ${member.last_name}</a></td>
                            <td>${member.party}</td>
                            <td>${member.state}</td>
                            <td>${member.seniority}</td>
                            <td>${member.votes_with_party_pct}</td>
                        </tr>`;
            })
        }
        senate_data.innerHTML = template;
    }
});*/