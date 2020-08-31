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
  const bio = document.querySelector('#bio').value.trim();
  const medium = document.querySelector('#medium').value.trim();
  const interests = document.querySelector('#interests').value.trim();


  // if all signup fields are filled out, make POST request to api/users route to create new user
  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        password,
        email,
        bio,
        medium,
        interests
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    console.log(response);

    // check the response status
    if (response.ok) {
      // document.location.replace('/dashboard/');
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);

