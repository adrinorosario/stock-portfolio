function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm_passwor = document.getElementById("confirm-password").value;

    if(name == "" || name == " ") {
        alert("Name field cannot be empty. Please enter your full name.");
    } else if (name.trim() == "") {
        alert("Name field cannot be empty. Please enter your full name.");
    }

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

    if(confirm_password == "" || confirm_password == " ") {
        alert("Re-enter your password to confirm.");
    } else if (confirm_password.trim() == "") {
        alert("Re-enter your password to confirm.");
    }
}