
// User Profile Page Script

const names = document.getElementById('name');
const email = document.getElementById('email');
const mobile = document.getElementById('mobile');
const password = document.getElementById('password');

try {
    const user = sessionStorage.getItem('userData');
    if (user != null) {
        const userData = JSON.parse(user);  
        names.value = userData.name;
        email.value = userData.email;
        mobile.value = userData.mobile;
        password.value = userData.password;
    } else {
        console.log('session expired...');

    }
} catch (error) {
    console.log(error);
}

function updateProfile() {
    console.log('*** update profile sctipt ***');
    const userData = JSON.stringify({
        'name': names.value,
        'email': email.value,
        'password': password.value,
        'mobile': mobile.value,
        'role': JSON.parse(sessionStorage.getItem('userData')).role
    });
    sessionStorage.setItem("userData", userData);
    location.href = "home.html";
}