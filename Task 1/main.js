//first message of javascript
console.log("Starting javascript...");

//first variables to know and print
var myName = "Alex";
var age = 25;
var ignasiAge = 32;
var ageDiff= age - ignasiAge;
console.log(myName);
console.log(age);
console.log(ageDiff);

//first conditionals
if(age < 21){
    console.log("You are not older than 21");
}else{
    console.log("You are older than 21");
}

//conditionals comparing the age
if(ageDiff==0){
    console.log("You have the same age as Ignasi");
}else if(ageDiff>0){
    console.log("Ignasi is younger than you");
}else if(ageDiff<0){
    console.log("Ignasi is older than you");
}
//Creating array of names for the sort exercice_1
console.log("-----Exercice_1 ------");
var array_names = ["Javier", "Alex", "Anna", "Pablo"];
array_names.sort();
console.log(array_names[0]);
console.log(array_names[3]);
for(var i=0; i<array_names.length; i++){
    console.log(array_names[i]);
}
//Creating array of names for the sort exercice_2
console.log("-----Exercice_2 ------");
var array_ages = ["23","28","22","29","26","24"];
array_ages.sort();
for(var i=0;i<array_ages.length;i++){
    if((array_ages[i]%2)==0){
        console.log(array_ages[i]);
    }
}
//Creating array of names for the sort exercice_3
console.log("-----Exercice_3 ------");
function lowest_number(array){
    var lowest = array[0];
    for(var i=0;i<array.length; i++){
        if(lowest>array[i]){
            lowest=array[i];
        }
    }
    console.log(lowest);
};
lowest_number(array_ages);

//Creating array of names for the sort exercice_4
console.log("-----Exercice_4 ------");
function bigest_number(array){
    var lowest = array[0];
    for(var i=0;i<array.length; i++){
        if(lowest<array[i]){
            lowest=array[i];
        }
    }
    console.log(lowest);
};
bigest_number(array_ages);

//Creating array of names for the sort exercice_5
console.log("-----Exercice_5 ------");
function print_position(array, index){
    console.log(array[index]);
}
print_position(array_ages, 3);

//Creating array of names for the sort exercice_6
console.log("-----Exercice_6 ------");
var array_ex6 = [3,6,67,6,23,11,100,8,93,0,17,24,7,33,1,33,45,28,33,23,12,99,100]; 
function duplicated_num(array){
    var finalarray= [];
    for(var i=0; i<array.length; i++){
        var duplicated= array[i];
        for(var j=i+1;j<array.length; j++){
            if(array[j]==duplicated){
                if(!finalarray.includes(duplicated)){
                    finalarray.push(duplicated);
                }
            }
        }
    }
    console.log(finalarray);
};
duplicated_num(array_ex6);

//Creating array of names for the sort exercice_7
console.log("-----Exercice_7 ------");
var myColor = ["Red", "Green", "White", "Black"];
var stringColor = myColor.join();
console.log(stringColor);

//4. JavaScript String Functions
console.log("------4. JavaScript String Functions--------");
//Exercice 1 
console.log("-----Exercice_1 ------");
function reverse(number){
    number = number + "";
    return number.split("").reverse().join("");
};
console.log(reverse(32443));

//Exercice 2
console.log("-----Exercice_2 ------");
function aflabetical(string){
    return string.split("").sort().join("");
}
console.log(aflabetical("webmaster"));

//Exercice 3
console.log("-----Exercice_3 ------");
function upperTolow(string){
    var splitStr = string.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
}

console.log(upperTolow("prince of persia"));
//Exercice 4
console.log("-----Exercice_4 ------");
function longest(string){
    var stringSplit = string.split(' '); 
    var longerword=0;
    var longer=[];
    for(var i=0; i<stringSplit.length; i++){
        if(stringSplit[i].length>longerword){
            longerword=stringSplit[i].length;
            longer.pop();
            longer.push(stringSplit[i]);
        }
    }
    return longer;
};
console.log(longest("Web Development Tutorial"));

