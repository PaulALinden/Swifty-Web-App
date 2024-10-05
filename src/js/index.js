import config from './config';
import { validateInput, sanitizeInput } from './assets';

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const logInButton = document.getElementById("submit");

//add disable while waiting
logInButton.addEventListener("click", ev => {
  ev.preventDefault();

  const usernameValue = sanitizeInput(usernameInput.value);
  const passwordValue = sanitizeInput(passwordInput.value);

  sendCredentials(usernameValue, passwordValue);

});

async function sendCredentials(username, password) {
  //Check inputs... Needs css for a more user friendly approach.
  if (!username.trim()) {
    usernameInput.classList.add("error");
    alert("Please enter a username");
    return;
  } else if (!validateInput(username, 'lettersAndNumbers')) {
    usernameInput.classList.add("error");
    alert("Username can only contain letters and numbers");
    return;
  }else{
    usernameInput.classList.remove("error");
  }

  if (!password.trim()) {
    passwordInput.classList.add("error");
    alert("Please enter a password");
    return;
  } else if (password.length < 8) {
    passwordInput.classList.add("error");
    alert("Password must be at least 8 characters long.");
    return;
  }else{
    usernameInput.classList.remove("error");
  }

  const apiUrl = `http://${config.BASE_URL}:3000/api/users/loginUser`

  const postData = {
    username: username.toString().toLowerCase(),
    password: password.toString().toLowerCase()
  };

  try {
    console.log("Sending to server")
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      console.log('Network response was not ok ' + response.statusText);
      console.log(response)
    }

    const data = await response.json();
    console.log('Success:', data);


  } catch (error) {
    console.error('Error:', error);
  }
}





