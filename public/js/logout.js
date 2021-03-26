const logoutBtn = document.querySelector("#logout-btn");

logoutBtn.addEventListener('click', logoutHandler);

async function logoutHandler() {
    await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
        document.location.replace('/login');
        console.log(response);
    }).catch((err) => {
        if (err) throw err;
    });    
};