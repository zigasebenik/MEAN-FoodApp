function pridobiIdZaUrejanje() {

    console.log("TKLE MAMO");


}

function pridobiIdZaIzbris() {

    console.log("TKLE nimamo");
    /*var email = $("#email").val();
    let form = document.getElementById('form');
    let submit = document.getElementById('signIn');


    if (validateEmail(email)) {
        console.log("OK");
        form.action = 'http://localhost:3000/login/check';
        form.method = 'POST';
        form.submit();
    } else {
        console.log("NOT OK");
    }*/
}

function submitForm(action)
{
    document.getElementById('columnarForm').action = action;
    document.getElementById('columnarForm').submit();
}

function updateRestaurantRate(restaurantId) {
    var data = {
        id: restaurantId
    };
    console.log("HEY IM HERE");
    var xhr = new XMLHttpRequest();

    xhr.open('GET', '/api/updateRestaurantRating/' + restaurantId);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
}