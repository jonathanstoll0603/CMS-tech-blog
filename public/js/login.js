const loginFormHandler = async (e) => {
    // prevent form from refreshing after submission
    e.preventDefault();

    const userEmail = document.querySelector('#email-val').value().trim();
    const userPassword = document.querySelector('#password-val').value().trim();

    if (userEmail && userPassword) {
        const responseData = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (responseData.ok) {
            document.location.replace('/');
        } else {
            alert("Please enter both your email and password.");
            return;
        }
    };

};

const signupBtn = () => {
    document.location.replace('/user/signup');
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

document.querySelector('#signup-btn').addEventListener('submit', signupBtn);
