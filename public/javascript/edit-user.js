async function updateFormHandler(event) {
	event.preventDefault();

	const id = window.location.toString().split('/')[
		window.location.toString().split('/').length - 1
	];

	const form = document.querySelector('#udpate-user-form');

	const formData = new FormData(form);

	const spinnerWrapper = document.querySelector('.spinner-wrapper');
	const spinner = document.querySelector('#spinner');

	form.classList.add('d-none');
	spinnerWrapper.classList.replace('d-none', 'd-flex');
	spinner.classList.remove('d-none');

	const response = await fetch(`/api/users/${id}`, {
		method : 'PUT',
		body   : formData
	});

	// check the response status
	if (response.ok) {
		document.location.replace('/dashboard');
	} else {
		alert(response.statusText);
	}

	spinnerWrapper.classList.add('d-none');
	spinner.classList.add('d-none');
	form.classList.remove('d-none');
}

document.querySelector('#udpate-user-form').addEventListener('submit', updateFormHandler);
