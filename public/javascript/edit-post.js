async function editFormHandler(event) {
	event.preventDefault();

	const id = window.location.toString().split('/')[
		window.location.toString().split('/').length - 1
  ];
  
  const form = document.querySelector('#edit-post-form');

  const formData = new FormData(form);

  const spinner = document.querySelector('#spinner');
	spinner.classList.remove('d-none');

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
  spinner.classList.add('d-none');
}

document.querySelector('#edit-post-form').addEventListener('submit', editFormHandler);
