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

// NEED TO ESCAPE STRINGS BECAUSE "" MESS UP REQ.BODY

async function newFormHandler(event) {
	event.preventDefault();

	const form = document.querySelector('#new-post-form');

	var formData = new FormData(form);

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

document.querySelector('#new-post-form').addEventListener('submit', newFormHandler);
