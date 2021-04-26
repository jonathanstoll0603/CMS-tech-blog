const deleteBtn = document.querySelector('#delete-btn');

// function that handles fetch routing for deleting a comment
async function deleteCommentHandler (event) {
    
    if (event.target.hasAttribute('data-id')) {
        const postID = event.target.getAttribute('data-id');

        console.log(postID)
        
        const response = await fetch(`/api/blog/${postID}`, {
            method: 'DELETE',
        });
        
        if (response.ok) {
            alert('Comment deleted successfully.')
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
    
}

// click handler for deleting a comment 
deleteBtn.addEventListener('click', deleteCommentHandler);