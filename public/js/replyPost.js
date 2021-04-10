const replyForm = document.querySelector('.reply-list');
const replyContent = document.querySelector('#reply-content');
const postID = document.querySelector('#reply-btn');

// form handler for editing a comment 
replyForm.addEventListener('submit', event => {

    event.preventDefault();

    const editData = {
        content: replyContent.value,
        post_id: postID.getAttribute('data-id')
    }

    console.log(editData)

    if (editData.content) {

        submitCommentHandler(editData.content, editData.post_id);

    } else {
        alert("You must enter a new title and body to submit this form.");
    }
});

// Async function to edit a comment
async function submitCommentHandler(content, post_id) {

    const response = await fetch(`/api/blog/reply`, {
        method: 'POST',
        body: JSON.stringify({ content, post_id }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        alert('Comment submitted successfully.')
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}