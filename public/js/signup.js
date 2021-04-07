const signupForm = document.querySelector('.signup-form');
const userEmail = document.querySelector('input#email-signup');
const userPassword = document.querySelector('input#password-signup');
const userUsername = document.querySelector('input#username-signup');

// event handler for the signupForm submission
signupForm.addEventListener('submit', event => {
    event.preventDefault();

    // save user inputs in userData object
    const userData = {
        username: userUsername.value.trim(),
        email: userEmail.value.trim(),
        password: userPassword.value.trim()
    };

    // If user has entered all necessary information, call the signupFormHandler function else return
    if (userData.username && userData.email && userData.password) {
        signupFormHandler(userData.username, userData.email, userData.password);
    } else {
        alert("Signup unsuccessful. Ensure all necessary fields are filled in and try again.");
        return;
    }
});

// API call to the api/user/ (aka signup) POST route
async function signupFormHandler(username, email, password) {

    await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({username, email, password}),
        headers: { 'Content-Type': 'application/json' },
    }).then((response) => {

        console.log(response);
        
        document.location.replace('/dashboard');

    }).catch((err) => {
        if (err) throw err;
    });
};