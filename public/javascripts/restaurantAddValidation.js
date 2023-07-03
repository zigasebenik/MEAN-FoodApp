function checkedYes(){
    if(document.getElementById('inputBoniYes').checked) {
        var studenti = document.getElementById('inputBoniCost');
        studenti.disabled = false;
    }
}

function checkedNo(){
    if(document.getElementById('inputBoniNo').checked) {
        var studenti = document.getElementById('inputBoniCost');
        studenti.disabled = true;
    }
}

function zaprtoMonday(){
    var checkedMonday = document.getElementById('openMonday');
    var fromMonday = document.getElementById('inputMondayFrom');
    var toMonday = document.getElementById('inputMondayTo');
    if(checkedMonday.checked == true){
        fromMonday.disabled = true;
        toMonday.disabled = true;
        fromMonday.required = false;
        toMonday.required = false;
    }else{
        fromMonday.disabled = false;
        toMonday.disabled = false;
        fromMonday.required = true;
        toMonday.required = true;
    }
}

function zaprtoTuesday(){
    var checkedTuesday = document.getElementById('openTuesday');
    var fromTuesday = document.getElementById('inputTuesdayFrom');
    var toTuesday = document.getElementById('inputTuesdayTo');
    if(checkedTuesday.checked == true){
        fromTuesday.disabled = true;
        toTuesday.disabled = true;
        fromTuesday.required = false;
        toTuesday.required = false;
    }else{
        fromTuesday.disabled = false;
        toTuesday.disabled = false;
        fromTuesday.required = true;
        toTuesday.required = true;
    }
}function zaprtoWednesday(){
    var checkedWednesday = document.getElementById('openWednesday');
    var fromWednesday = document.getElementById('inputWednesdayFrom');
    var toWednesday = document.getElementById('inputWednesdayTo');
    if(checkedWednesday.checked == true){
        fromWednesday.disabled = true;
        toWednesday.disabled = true;
        fromWednesday.required = false;
        toWednesday.required = false;
    }else{
        fromWednesday.disabled = false;
        toWednesday.disabled = false;
        fromWednesday.required = true;
        toWednesday.required = true;
    }
}function zaprtoThursday(){
    var checkedThursday = document.getElementById('openThursday');
    var fromThursday = document.getElementById('inputThursdayFrom');
    var toThursday = document.getElementById('inputThursdayTo');
    if(checkedThursday.checked == true){
        fromThursday.disabled = true;
        toThursday.disabled = true;
        fromThursday.required = false;
        toThursday.required = false;
    }else{
        fromThursday.disabled = false;
        toThursday.disabled = false;
        fromThursday.required = true;
        toThursday.required = true;
    }
}
function zaprtoFriday(){
    var checkedFriday = document.getElementById('openFriday');
    var fromFriday = document.getElementById('inputFridayFrom');
    var toFriday = document.getElementById('inputFridayTo');
    if(checkedFriday.checked == true){
        fromFriday.disabled = true;
        toFriday.disabled = true;
        fromFriday.required = false;
        toFriday.required = false;
    }else{
        fromFriday.disabled = false;
        toFriday.disabled = false;
        fromFriday.required = true;
        toFriday.required = true;
    }
}

function zaprtoSaturday(){
    var checkedSaturday = document.getElementById('openSaturday');
    var fromSaturday = document.getElementById('inputSaturdayFrom');
    var toSaturday = document.getElementById('inputSaturdayTo');
    if(checkedSaturday.checked == true){
        fromSaturday.disabled = true;
        toSaturday.disabled = true;
        fromSaturday.required = false;
        toSaturday.required = false;
    }else{
        fromSaturday.disabled = false;
        toSaturday.disabled = false;
        fromSaturday.required = true;
        toSaturday.required = true;
    }
}

function zaprtoSunday(){
    var checkedSunday = document.getElementById('openSunday');
    var fromSunday = document.getElementById('inputSundayFrom');
    var toSunday = document.getElementById('inputSundayTo');
    if(checkedSunday.checked == true){
        fromSunday.disabled = true;
        toSunday.disabled = true;
        fromSunday.required = false;
        toSunday.required = false;
    }else{
        fromSunday.disabled = false;
        toSunday.disabled = false;
        fromSunday.required = true;
        toSunday.required = true;
    }
}

var loadFile = function(event) {
    var image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
};

var loadFile2 = function(event) {
    var image = document.getElementById('output2');
    image.src = URL.createObjectURL(event.target.files[0]);
};
