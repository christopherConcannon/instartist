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
	const response = await fetch(`/api/users/${id}`, {
		method : 'DELETE'
	});
	console.log(response);
	logout(); //call a function to log out the user once deleted
}

document.querySelector('#delete').addEventListener('click', deleteUserFormHandler);
