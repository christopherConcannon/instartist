async function editFormHandler(event) {
	event.preventDefault();

	const id = window.location.toString().split('/')[
		window.location.toString().split('/').length - 1
	];

	const form = document.querySelector('#edit-post-form');

	const formData = new FormData(form);

	const spinnerWrapper = document.querySelector('.spinner-wrapper');
	const spinner = document.querySelector('#spinner');

	form.classList.add('d-none');
	spinnerWrapper.classList.replace('d-none', 'd-flex');
	spinner.classList.remove('d-none');

	const response = await fetch(`/api/posts/${id}`, {
		method : 'PUT',
		body   : formData
	});

	if (response.ok) {
		document.location.replace('/dashboard/');
		// document.location.replace('/');
	} else {
		alert(response.statusText);
  }
  
	// spinnerWrapper.classList.add('d-none');
	// spinner.classList.add('d-none');
	// form.classList.remove('d-none');
}

document.querySelector('#edit-post-form').addEventListener('submit', editFormHandler);
