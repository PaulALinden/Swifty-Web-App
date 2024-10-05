import config from './config.js';
import { validateInput, sanitizeInput } from './assets.js';

//Create account
const signUpButton = document.getElementById("signup")
const newUsernameInput = document.getElementById("newusername")
const newEmailInput = document.getElementById("newemail")
const newPasswordInput = document.getElementById("newpassword")
const newFirstNameInput = document.getElementById("newfirstname")
const newLastNameInput = document.getElementById("newlastname")
const newBirthdateInput = document.getElementById("newbirthdate")

//add disable while waiting
signUpButton.addEventListener("click", ev => {
  ev.preventDefault();

  const usernameValue = sanitizeInput(newUsernameInput.value);
  const emailValue = sanitizeInput(newEmailInput.value);
  const passwordValue = sanitizeInput(newPasswordInput.value);
  const firstNameValue = sanitizeInput(newFirstNameInput.value);
  const lastNameValue = sanitizeInput(newLastNameInput.value);
  const birthdateValue = sanitizeInput(newBirthdateInput.value);

  // further dev....
  createAccount(
    usernameValue,
    emailValue,
    passwordValue,
    firstNameValue,
    lastNameValue,
    birthdateValue
  );

  console.log("Click")
});

async function createAccount(username, email, password, firstName, lastName, birthdate) {

  const apiUrl = `https://${config.BASE_URL}:3000/api/users/register/individual`;

  //Check inputs... Needs css for a more user friendly approach.
  if (!username) {
    newUsernameInput.classList.add("error");
    alert("Please enter a username");
    return;
  } else if (!validateInput(username, "lettersAndNumbers")) {
    newUsernameInput.classList.add("error");
    alert("Username can only contain letters and numbers");
    return;
  } else{
    newUsernameInput.classList.remove("error");
  }

  if (!email) {
    newEmailInput.classList.add("error");
    alert("Please enter a email");
    return;
  } else if (!validateInput(email, "email")) {
    newEmailInput.classList.add("error");
    alert("Please type a valid email format");
    return;
  } else{
    newEmailInput.classList.remove("error");
  }

  if (!password) {
    newPasswordInput.classList.add("error");
    alert("Please enter a password");
    return;
  } else if (password.length < 8) {
    newPasswordInput.classList.add("error");
    alert("Password must be at least 8 characters long.");
    return;
  } else{
    newPasswordInput.classList.remove("error");
  }

  if (!firstName) {
    newFirstNameInput.classList.add("error");
    alert("Please enter a first name");
    return;
  } else if (!validateInput(firstName, "letters")) {
    newFirstNameInput.classList.add("error");
    alert("First name can only contain letters");
    return;
  } else{
    newFirstNameInput.classList.remove("error");
  }

  if (!lastName) {
    newLastNameInput.classList.add("error");
    alert("Please enter a last name");
    return;
  } else if (!validateInput(lastName, "letters")) {
    newLastNameInput.classList.add("error");
    alert("Last name can only contain letters");
    return;
  } else{
    newLastNameInput.classList.remove("error");
  }

  if (!validateInput(birthdate, "birthdate")) {
    newBirthdateInput.classList.add("error");
    alert("Please enter a valid birthdate (YYYY-MM-DD)");
    return;
  } else{
    newBirthdateInput.classList.remove("error");
  }
  

  const postData = {
    username: username.toString().toLowerCase(),
    email: email.toString().toLowerCase(),
    password: password.toString().toLowerCase(),
    firstName: firstName.toString().toLowerCase(),
    lastName: lastName.toString().toLowerCase(),
    birthdate: birthdate.toString().toLowerCase(),
  };

  console.log("Sending to server");
  console.log(postData);
  try {
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

    alert(`Error: ${error.message || 'Registration failed. Please try again.'}`);
    return;
  } finally {

    console.log('Redirecting')
    window.location.href = '../../index.html';
  }
};