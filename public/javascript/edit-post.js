async function editFormHandler(event) {
	event.preventDefault();

	const id = window.location.toString().split('/')[
		window.location.toString().split('/').length - 1
  ];
  
  const form = document.querySelector('#edit-post-form');

  const formData = new FormData(form);

	const response = await fetch(`/api/posts/${id}`, {
		method  : 'PUT',
    body: formData
	});

	if (response.ok) {
		document.location.replace('/dashboard/');
		// document.location.replace('/');
	} else {
		alert(response.statusText);
	}
}

document.querySelector('#edit-post-form').addEventListener('submit', editFormHandler);
