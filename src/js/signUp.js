import config from './config.js';
import { validateInput, sanitizeInput, insertErrorMessage, removeErrorMessage } from './assets.js';

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
});

async function createAccount(username, email, password, firstName, lastName, birthdate) {

  const apiUrl = `http://${config.API_URL}:3000/api/users/register/individual`;

  //Check inputs... Needs css for a more user friendly approach.
  if (!username) {
    newUsernameInput.classList.add("error");
    insertErrorMessage('Please enter a username', 'username');
    return;
  } else if (!validateInput(username, "lettersAndNumbers")) {
    newUsernameInput.classList.add("error");
    insertErrorMessage('Username can only contain letters and numbers', 'username');
    return;
  } else {
    newUsernameInput.classList.remove("error");
    removeErrorMessage('username');
  }

  if (!email) {
    newEmailInput.classList.add("error");
    insertErrorMessage('Please enter a email.', 'email');
    return;
  } else if (!validateInput(email, "email")) {
    newEmailInput.classList.add("error");
    insertErrorMessage('Please type a valid email format.', 'email');
    return;
  } else {
    newEmailInput.classList.remove("error");
    removeErrorMessage('email');
  }

  if (!password) {
    newPasswordInput.classList.add("error");
    insertErrorMessage('Please enter a password.', 'password');
    return;
  } else if (password.length < 8) {
    newPasswordInput.classList.add("error");
    insertErrorMessage('Password must be at least 8 characters long.', 'password');
    return;
  } else {
    newPasswordInput.classList.remove("error");
    removeErrorMessage('password');
  }

  if (!firstName) {
    newFirstNameInput.classList.add("error");
    insertErrorMessage('Please enter a first name.', 'firstname');
    return;
  } else if (!validateInput(firstName, "letters")) {
    newFirstNameInput.classList.add("error");
    insertErrorMessage('First name can only contain letters.', 'firstname');
    return;
  } else {
    newFirstNameInput.classList.remove("error");
    removeErrorMessage('firstname');
  }

  if (!lastName) {
    newLastNameInput.classList.add("error");
    insertErrorMessage('Please enter a last name.', 'lastname');
    return;
  } else if (!validateInput(lastName, "letters")) {
    newLastNameInput.classList.add("error");
    insertErrorMessage('Last name can only contain letters.', 'lastname');
    return;
  } else {
    newLastNameInput.classList.remove("error");
    removeErrorMessage('lastname');
  }

  if (!validateInput(birthdate, "birthdate")) {
    newBirthdateInput.classList.add("error");
    insertErrorMessage('Please enter a valid birthdate (YYYY-MM-DD).', 'birthdate');
    return;
  } else {
    newBirthdateInput.classList.remove("error");
    removeErrorMessage('birthdate');
  }


  const postData = {
    email: email.toString().toLowerCase(),
    username: username.toString().toLowerCase(),
    firstName: firstName.toString().toLowerCase(),
    lastName: lastName.toString().toLowerCase(),
    birthdate: birthdate.toString().toLowerCase(),
    password: password.toString().toLowerCase(),
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });

    if (response.status === 201) {
      window.location.href = '/index.html';
    } else {
      throw new Error("Something went wrong, try again later.")
    }


  } catch (error) {
    alert(`Error: ${error.message || 'Registration failed. Please try again.'}`);
    return;
  }
};