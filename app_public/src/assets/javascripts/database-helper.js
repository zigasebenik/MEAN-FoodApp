
function dropDatabase(key) {
    var data = {
        validation: key,
    };
    var xhr = new XMLHttpRequest();

    xhr.open('POST', '/api/database/drop');
    xhr.onload = function(data) {
        //console.log('loaded', this.responseText);
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
}

function dropText(){
    let konzola = document.getElementById("konzola");
    konzola.innerHTML = "DATABASE dropped";
}

function fillText(){
    let konzola = document.getElementById("konzola");
    konzola.innerHTML = "DATABASE created";
}

function fillAPIText(){
    let konzola = document.getElementById("konzola");
    var data = {
        name: 'googleAPI'
    };
    var xhr = new XMLHttpRequest();

    xhr.open('GET', '/api/analytics');
    xhr.onload = function(data) {
        konzola.innerHTML = "API CALLS:" + this.responseText;
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));

}

function fillDatabase(key) {
    var data = {
        validation: key,
    };
    var xhr = new XMLHttpRequest();

    xhr.open('POST', '/api/database/fill');
    xhr.onload = function(data) {
        //console.log('loaded', this.responseText);
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
}

