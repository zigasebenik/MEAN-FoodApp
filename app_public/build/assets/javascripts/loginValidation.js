function validateEmail(email) {
    //var re = /^[a-zA-Z0-9!@#$%\^&*)(+=._-]*$/;
    var re = /^[a-zA-Z0-9@\^&*)(+=._-]*$/;
    return re.test(email);
}

document.getElementById('signIn').addEventListener("click", function(event){
    event.preventDefault()
});

function validate() {

    var email = $("#email").val();
    var passwd = $("#passwd").val();
    let form = document.getElementById('form');
    let submit = document.getElementById('signIn');

    if (email === "")
        alert("Vnesi email");
    else if (passwd === "")
        alert("Vnesi geslo");

    return location.href= "/";

    // if (validateEmail(email)) {
    //     console.log("OK");
    //     form.action = 'http://localhost:3000/login/check';
    //     form.method = 'POST';
    //     form.submit();
    // } else {
    //     console.log("NOT OK");
    // }
}

//$("#signIn").on("click", validate);