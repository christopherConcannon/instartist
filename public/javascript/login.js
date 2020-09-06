// if all login fields are filled out, make POST request to validate user
async function loginFormHandler(event) {
	event.preventDefault();

	const username = document.querySelector('#username-login').value.trim();
	const password = document.querySelector('#password-login').value.trim();

	if (username && password) {
		const response = await fetch('/api/users/login', {
			method  : 'post',
			body    : JSON.stringify({
        username,
				password
			}),
			headers : { 'Content-Type': 'application/json' }
		});

		// check the response status
		if (response.ok) {
			document.location.replace('/dashboard');
			// document.location.replace('/');
		} else {
      // alert(response.statusText);
      document.location.replace('/login');
      return;
		}
	}
}

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
