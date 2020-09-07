async function newPostFormHandler(event) {
	event.preventDefault();

	const form = document.querySelector('#new-post-form');

	const formData = new FormData(form);

	const spinnerWrapper = document.querySelector('.spinner-wrapper');
	const spinner = document.querySelector('#spinner');

	form.classList.add('d-none');
	spinnerWrapper.classList.replace('d-none', 'd-flex');
	spinner.classList.remove('d-none');

	const response = await fetch(`/api/posts`, {
		method : 'POST',
		body   : formData
	});

	if (response.ok) {
		document.location.replace('/dashboard');
	} else {
		alert(response.statusText);
	}
}

document.querySelector('#new-post-form').addEventListener('submit', newPostFormHandler);
