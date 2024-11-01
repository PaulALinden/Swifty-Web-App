import config from './config';
import { validateInput, sanitizeInput, insertErrorMessage, removeErrorMessage } from './assets';

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const logInButton = document.getElementById('submit');

//add disable while waiting
logInButton.addEventListener('click', ev => {
  ev.preventDefault();

  const usernameValue = sanitizeInput(usernameInput.value);
  const passwordValue = sanitizeInput(passwordInput.value);

  logIn(usernameValue, passwordValue);
});

async function logIn(username, password) {
   const apiUrl = `http://${config.BASE_URL}:3000/api/users/loginUser`
   
  //Check inputs... Needs css for a more user friendly approach.
  if (!username) {
    usernameInput.classList.add('error');
    insertErrorMessage('Please enter a username.', 'username');
    return;
  } else if (!validateInput(username, 'lettersAndNumbers')) {
    usernameInput.classList.add('error');
    insertErrorMessage('Username can only contain letters and numbers.', 'username');
    return;
  }else{
    usernameInput.classList.remove('error');
    removeErrorMessage('username');
  }

  if (!password) {
    passwordInput.classList.add('error');
    insertErrorMessage('Please enter a password.', 'password')
    return;
  } /*else if (password.length < 8) {
    passwordInput.classList.add('error');
    insertErrorMessage('Password must be at least 8 characters long.','password')
    return;
  }*/else{
    passwordInput.classList.remove('error');
    removeErrorMessage('password');
  }

  const postData = {
    username: username.toString().toLowerCase(),
    password: password.toString().toLowerCase()
  };

  try {
    console.log('Sending to server')
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
      alert("Wrong username or password")
    }

    const data = await response.json();
    console.log('Success:', data);

    //Add auth logic -------------
    if(data){
      localStorage.setItem("user", JSON.stringify(data));
      console.log("Redirecting")
      window.location.href = "/home.html";
    }else{
      throw new Error("Something went please try again");
    }

  } catch (error) {
    console.error('Error:', error);
    alert(error)
  }
}


