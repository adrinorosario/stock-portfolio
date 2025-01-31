// universal AJAX Function
function fetchData(url, callback, method = "GET", data = null) {
    let xhr = new XMLHttpRequest();

    xhr.open(method, url, true);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { // Check if request is complete
            if (xhr.status >= 200 && xhr.status < 300) {
                callback(null, JSON.parse(xhr.responseText)); // Successful response
            } else {
                callback(`Error: ${xhr.status} - ${xhr.statusText}`, null);
            }
        }
    };

    xhr.send(data ? JSON.stringify(data) : null);
}

function loadPageData() {
    let page = document.body.getAttribute("data-page"); 

    if (page === "welcome") {
        fetchData("mock/welcome.json", function (error, data) {
            if (error) {
                console.error(error);
            } else {
                console.log("Welcome Page Data:", data);
            }
        });
    } else if (page === "dashboard") {
        fetchData("mock/dashboard.json", function (error, data) {
            if (error) {
                console.error(error);
            } else {
                document.querySelector(".overview .card:nth-child(1) strong").textContent = data.BTC;
                document.querySelector(".overview .card:nth-child(2) strong").textContent = data.LTC;
                document.querySelector(".overview .card:nth-child(3) strong").textContent = data.ETM;
                document.querySelector(".overview .card:nth-child(4) strong").textContent = data.BNB;
            }
        });
    } else if (page === "signup") {
        document.querySelector(".form").addEventListener("submit", function (event) {
            event.preventDefault();

            let userData = {
                name: document.querySelector("#name").value,
                email: document.querySelector("#email").value,
                password: document.querySelector("#password").value,
                confirmPassword: document.querySelector("#confirm-password").value,
            };

            console.log("Signup Data:", userData);
            alert("Signup Successful! (Data logged in console)");
        });
    } else if (page === "resetpassword") {
        document.querySelector(".form").addEventListener("submit", function (event) {
            event.preventDefault();

            let resetData = {
                newPassword: document.querySelector("input[name='new-password']").value,
                confirmPassword: document.querySelector("input[name='confirm-new-password']").value,
            };

            console.log("Password Reset Data:", resetData);
            alert("Password Reset Successful! (Data logged in console)");
        });
    } else if (page == "pricing") {
        console.log("Pricing page loaded");
    }
}

document.addEventListener("DOMContentLoaded", loadPageData);
