function validateForm() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(email == "" || email == " ") {
        alert("Email field cannot be empty");
    } else if (email.trim() == "") {
        alert("Email field cannot be empty");
    }

    if(password == "" || password == " ") {
        alert("Password field cannot be empty. Please enter your password to sign-in.");
    } else if (password.trim() == "") {
        alert("Password field cannot be empty. Please enter your password to sign-in.");
    }
}