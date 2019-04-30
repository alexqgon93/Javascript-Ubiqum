let least_attendance_house=document.getElementById("least_attendance_house");
let top_attendancy_house=document.getElementById("top_attendance_house");
let polititians= data.results[0].members;
let s_m_a=[];

//we need to check the total_present and select the 10% and then show the congressman with the votes missed
//first we make the array with the congressman
polititians.forEach(function(p){
    s_m_a.push(p);
})
//second we sort the entire array for the total present
let sort = s_m_a.sort(function(first, second){
    if(first.total_present>second.total_present){
        return -1;
    }
    if(first.total_present<second.total_present){
        return 0;
    }
    else{
        return 1;
    }
});
//console.log(s_m_a[0].total_present, s_m_a[440].total_present);
//we calculate the 10% of the entire members
let per=(members.length*10)/100;
let template_l_a_h="";
let template_t_a_h="";
let s_m_a_def=s_m_a;
//now we need to print the 10% of the top list
for(let i=0; i<per ;i++){
    template_t_a_h+=`<tr>
                    <td><a href="${s_m_a_def[i].url}">${s_m_a_def[i].first_name} ${s_m_a_def[i].middle_name||""} ${s_m_a_def[i].last_name}</a></td>
                    <td>${s_m_a_def[i].missed_votes}</td>
                    <td>${s_m_a_def[i].missed_votes_pct}</td>
                </tr>`;
                top_attendancy_house.innerHTML=template_t_a_h;
}
let s_m_a_rev=s_m_a.reverse();
for(let i=0; i<per; i++){
    template_l_a_h+=`<tr>
                    <td><a href="${s_m_a_rev[i].url}">${s_m_a_rev[i].first_name} ${s_m_a_rev[i].middle_name||""} ${s_m_a_rev[i].last_name}</a></td>
                    <td>${s_m_a_rev[i].missed_votes}</td>
                    <td>${s_m_a_rev[i].missed_votes_pct}</td>
                </tr>`;
                least_attendance_house.innerHTML=template_l_a_h;
}
