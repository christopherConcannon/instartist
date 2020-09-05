// async function newFormHandler(event) {
// 	event.preventDefault();

// 	const title = document.querySelector('input[name="post-title"]').value;
// 	const content = document.querySelector('textarea[name="post-content"]').value;

// 	const response = await fetch(`/api/posts`, {
// 		method  : 'POST',
// 		body    : JSON.stringify({
// 			title,
// 			content
// 		}),
// 		headers : {
// 			'Content-Type' : 'application/json'
// 		}
// 	});

// 	if (response.ok) {
// 		document.location.replace('/dashboard');
// 	} else {
// 		alert(response.statusText);
// 	}
// }

// document.querySelector('#new-post-form').addEventListener('submit', newFormHandler);

async function newFormHandler(event) {
	event.preventDefault();

	const form = document.querySelector('#new-post-form');

	const formData = new FormData(form);

	const spinner = document.querySelector('#spinner');
	spinner.classList.remove('d-none');

	const response = await fetch(`/api/posts`, {
		method : 'POST',
		body   : formData
	});

	if (response.ok) {
		document.location.replace('/dashboard');
		// document.location.replace('/');
	} else {
		alert(response.statusText);
	}

	spinner.classList.add('d-none');
}

document.querySelector('#new-post-form').addEventListener('submit', newFormHandler);
