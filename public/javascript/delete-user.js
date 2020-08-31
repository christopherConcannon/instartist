
async function logout() {
	// make POST request so backend has access to session variables...ie loggedIn boolean
	const response = await fetch('/api/users/logout', {
		method  : 'post',
		headers : { 'Content-Type': 'application/json' }
	});
	// if user is successfully logged out, take them back to homepage
	if (response.ok) {
		document.location.replace('/');
	} else {
		alert(response.statusText);
	}
}



async function deleteUserFormHandler(event) {
    event.preventDefault();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
  ];
          
      const response = await fetch(`/dashboard/user/${id}`, {
        method: 'DELETE',
        
      });
      console.log(response);
      logout(); //call a function for logaout the user has been delete
      
    
  }
  
  document.querySelector('#delete').addEventListener('click', deleteUserFormHandler);
  