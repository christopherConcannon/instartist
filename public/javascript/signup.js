const button = document.querySelector('#button');
button.addEventListener('click', () => {
  document.querySelector('#form2').style.display = 'block';
  button.style.display = 'none';
});

async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();


  // if all signup fields are filled out, make POST request to api/users route to create new user
  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    console.log(response);

    // check the response status
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
}

async function addInfoFormHandler(event) {
  event.preventDefault();

  const bio = document.querySelector('#bio');
  const medium = document.querySelector('#bio');
  const location = document.querySelector('#bio');

  if (button.clicked == true) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        bio,
        medium,
        location
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    console.log(response);

    // check the response status
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('#signup-form').addEventListener('submit', addInfoFormHandler);
