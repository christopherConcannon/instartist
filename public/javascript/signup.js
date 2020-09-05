const showLongFormBtn = document.querySelector('#show-long-form');
const longForm = document.querySelector('#long-form');

function showLongForm() {
	longForm.style.display = 'block';
	showLongFormBtn.style.display = 'none';
}

async function signupFormHandler(event) {
	event.preventDefault();
	const form = document.querySelector('#signup-form');

	const formData = new FormData(form);

	const spinnerWrapper = document.querySelector('.spinner-wrapper');
	const spinner = document.querySelector('#spinner');

	form.classList.add('d-none');
	spinnerWrapper.classList.replace('d-none', 'd-flex');
	spinner.classList.remove('d-none');

	const response = await fetch(`/api/users`, {
		method : 'POST',
		body   : formData
	});

	if (response.ok) {
    console.log(response, 'ok')
		document.location.replace('/dashboard');
		// document.location.replace('/');
	} else {
    console.log(response, 'not ok')
    // alert(response.statusText);
    document.location.replace('/signup');
	}

	// spinnerWrapper.classList.add('d-none');
	// spinner.classList.add('d-none');
	// form.classList.remove('d-none');
}

showLongFormBtn.addEventListener('click', showLongForm);
document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);
