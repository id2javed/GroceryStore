// Login Page Script 

const txtUsername = document.getElementById('txtUsername');
const txtPassword = document.getElementById('txtPassword');
const chkRemember = document.getElementById('chkRemember');
const usernameSpan = document.getElementById('usernameSpan');
const passwordSpan = document.getElementById('passwordSpan');
const displayMessage = document.getElementById('displayMessage');
const eyeIcon = document.getElementById('eyeIcon');

function isCheckBoxEnabled(chkRememberObj) {
    if (chkRememberObj.checked === true) {
        return true;
    }
    return false;
}

function togglePassword() {
    if (txtPassword.type === 'password') {
        txtPassword.type = 'text';
        eyeIcon.classList.remove('bi-eye');
        eyeIcon.classList.add('bi-eye-slash');
    } else {
        txtPassword.type = 'password';
        eyeIcon.classList.remove('bi-eye-slash');
        eyeIcon.classList.add('bi-eye');
    }
}

function handleEnter(event) {
    if (event.keyCode === 13) {
        onClickHander()
    }
}

function onClickHander() {
    if (isEmpty(txtUsername.value) == true) {
        usernameSpan.innerHTML = "Required";
    } else if (isEmpty(txtUsername.value == false)) {
        usernameSpan.innerHTML = "";
        if (isNumber(txtUsername.value) == true) {
            usernameSpan.innerHTML = "Digits not allowed";
        }
    }
    if (isEmpty(txtPassword.value) == true) {
        passwordSpan.innerHTML = "Required";
    } else if (isEmpty(txtPassword.value) == false) {
        passwordSpan.innerHTML = "";
    }
    if (isCheckBoxEnabled(chkRemember) == true) {
        sessionStorage.setItem("rememberMe", "on");
    }
    if (txtUsername.value == 'admin@gmail.com' && txtPassword.value == 'a') {
        const userData = JSON.stringify({
            'name': 'Admin',
            'email': 'admin@gmail.com',
            'password': 'a',
            'mobile': '9876543210',
            'role': 'admin'
        });
        sessionStorage.setItem("userData", userData);
        window.location.href = "../pages/home.html";
    } else if (txtUsername.value == 'staff@gmail.com' && txtPassword.value == 'a') {
        const userData = JSON.stringify({
            'name': 'Staff',
            'email': 'staff@gmail.com',
            'password': 'a',
            'mobile': '9876543210',
            'role': 'user'
        });
        sessionStorage.setItem("userData", userData);
        window.location.href = "../pages/home.html";
    } else {
        displayMessage.innerHTML = "Login Failure";
        displayMessage.style.backgroundColor = '#fddede';
    }
}
