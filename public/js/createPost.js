const createForm = document.querySelector('.create-form');
const postTitle = document.querySelector('#create-title');
const postContent = document.querySelector('#create-content');

// event handler to redirect to 
createForm.addEventListener('submit', event => {
    event.preventDefault();

    const postData = {
        title: postTitle.value.trim(),
        content: postContent.value.trim()
    };

    if (postData.title && postData.content) {
        createPostHandler(postData.title, postData.content);
        alert('Post successfully submitted!')
    } else {
        alert("Post unsuccessful. Ensure all necessary fields are filled in and try again.");
        return;
    }
});

async function createPostHandler(title, content) {

    await fetch('/api/blog/', {

        method: 'POST',
        body: JSON.stringify({title, content}),
        headers: { 'Content-Type': 'application/json' },
        
    }).then((response) => {

        console.log(response);
        
        document.location.replace('/dashboard');

    }).catch((err) => {
        if (err) throw err;
    });
};