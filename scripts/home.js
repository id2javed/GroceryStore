
// User Profile Page Script

const names = document.getElementById('name');
const email = document.getElementById('email');
const mobile = document.getElementById('mobile');
const password = document.getElementById('password');

try {
    const user = sessionStorage.getItem('userData');
    if (user != null) {
        const userData = JSON.parse(user);  
        names.innerText = userData.name;
        email.innerText = userData.email;
        mobile.innerText = userData.mobile;
    } else {
        console.log('session expired...');
    }
} catch (error) {
    console.log(error);
}

function editProfile() {
    console.log('*** edit profile sctipt ***');
    location.href = "profile.html";
}
