function validateEmail(email) {
    //var re = /^[a-zA-Z0-9!@#$%\^&*)(+=._-]*$/;
    var re = /^[a-zA-Z0-9@\^&*)(+=._-]*$/;
    return re.test(email);
}

function validate() {

    var email = $("#email").val();

    if (validateEmail(email)) {
        console.log("OK");
        window.location.pathname = '/login';
    } else {
        console.log("NOT OK");
        window.location.pathname = '/login';
    }
}

//$("#signIn").on("click", validate);