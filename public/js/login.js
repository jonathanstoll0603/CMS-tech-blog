const loginForm = document.querySelector(".login-form");
const userEmail = document.querySelector('input#email-login');
const userPassword = document.querySelector('input#password-login');

loginForm.addEventListener('submit', event => {
    event.preventDefault();

    const userData = {
        email: userEmail.value.trim(),
        password: userPassword.value.trim()
    };

    if (!userData.email || !userData.password) {
        alert("You must enter a valid email and password!");
        return;
    };

    // Call the loginUser function to make an API call to our api/user/login POST route
    loginUser(userData.email, userData.password); 
});

// API call to the api/user/login POST route
async function loginUser(email, password) {
    const response = await fetch('api/user/login', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        alert("Login Successful!")
        document.location.replace('/dashboard');
    } else {
        alert("Login Unsuccessful. Try Again.")
        document.location.replace('/login');
    }
};

// Below code handles the signup button event handler.
const signupBtn = document.querySelector('#signup-acct');

signupBtn.addEventListener('click', signupUser);

function signupUser() {
    document.location.replace('/signup');
};