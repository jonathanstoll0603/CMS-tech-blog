
const signupFormHandler = async (e) => {
    e.prevenDefault();

    const userEmail = document.querySelector('#email-signup').value().trim();
    const userPassword = document.querySelector('#password-signup').value().trim();
    const userUsername = document.querySelector('#username-signup').value().trim();
    
    if (userEmail && userPassword && userUsername) {
        const responseData = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({email, password, username}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (responseData.ok) {
            document.location.replace('/');
        } else {
            alert("Failed to sign up new user. Try a different username and/or email.");
            return;
        }
    };
}

document.querySelector('#signup-submit').addEventListener('submit', signupFormHandler);
