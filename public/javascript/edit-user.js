

async function updateFormHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  
  const bio = document.querySelector('#bio').value.trim();
  const medium = document.querySelector('#medium').value.trim();
  const interests = document.querySelector('#interests').value.trim();


  const response = await fetch(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      bio,
      medium,
      interests
    }),
    headers: { 'Content-Type': 'application/json' }
  });
  console.log(response);

  // check the response status
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }

}

document.querySelector('#udpate-form').addEventListener('submit', updateFormHandler);
