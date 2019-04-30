let least_loyalty_senate=document.getElementById("least_loyalty_senate");
let top_loyalty_senate=document.getElementById("top_loyalty_senate");
let pol = data.results[0].members;
let s_m_v=[];
pol.forEach(function(politics){
    s_m_v.push(politics);
})
    let sorted = s_m_v.sort(function(first, second){
        if(first.missed_votes<second.missed_votes){
            return -1;
        }
        if(first.missed_votes>second.missed_votes){
            return 0;
        }
        else{
            return 1;
        }
    });
//we create a fucntion that is gonna print the first 10% of the array
//10% del member.lenght
let percentage=(members.length*10)/100;
let template_l="";
let template_t="";
let s_m_v_def=s_m_v;
//we create a fucntion that is gonna print the last 10% of the array
for(let i=0; i<percentage ;i++){
    template_t+=`<tr>
                    <td><a href="${s_m_v_def[i].url}">${s_m_v_def[i].first_name} ${s_m_v_def[i].middle_name||""} ${s_m_v_def[i].last_name}</a></td>
                    <td>${s_m_v_def[i].missed_votes}</td>
                    <td>${s_m_v_def[i].missed_votes_pct}</td>
                </tr>`;
                top_loyalty_senate.innerHTML=template_t;
}
let s_m_v_rev=s_m_v.reverse();
for(let i=0; i<percentage; i++){
        template_l+=`<tr>
                        <td><a href="${s_m_v_rev.url}">${s_m_v_rev[i].first_name} ${s_m_v_rev[i].middle_name||""} ${s_m_v_rev[i].last_name}</a></td>
                        <td>${s_m_v_rev[i].missed_votes}</td>
                        <td>${s_m_v_rev[i].missed_votes_pct}</td>
                    </tr>`;
                    least_loyalty_senate.innerHTML=template_l;
}