const editForm = document.querySelector('.edit-form');
const editTitle = document.querySelector('#edit-title');
const editContent = document.querySelector('#edit-content');
const id = document.querySelector('#comment-id');

// form handler for editing a comment 
editForm.addEventListener('submit', event => {

    event.preventDefault();

    const editData = {
        title: editTitle.value,
        content: editContent.value,
        id: id.getAttribute('data-id')
    }

    if (editData.title && editData.content) {

        submitCommentHandler(editData.title, editData.content, editData.id);

    } else {
        alert("You must enter a new title and body to submit this form.");
    }
});

// Async function to edit a comment
async function submitCommentHandler(title, content, id) {

    const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        alert('Comment submitted successfully.')
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}