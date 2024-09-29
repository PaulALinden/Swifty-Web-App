import config from './config.js';
 
 //Create account
 const signUpButton = document.getElementById("signup")
 const newUsernameInput = document.getElementById("newusername")
 const newEmailInput = document.getElementById("newemail")
 const newPasswordInput = document.getElementById("newpassword")
 const newFirstNameInput = document.getElementById("newfirstname")
 const newLastNameInput = document.getElementById("newlastname")
 const newBirthdateInput = document.getElementById("newbirthdate")

 signUpButton.addEventListener("click", ev=> {
    ev.preventDefault();

    const usernameValue = newUsernameInput.value;
    const emailValue = newEmailInput.value;
    const passwordValue = newPasswordInput.value;
    const firstNameValue = newFirstNameInput.value;
    const lastNameValue = newLastNameInput.value;
    const birthdateValue = newBirthdateInput.value;

    //handle false inputs
    if (!usernameValue) {
      alert("Please enter a username");
      return;
    }else if(!passwordValue){
      alert("Please enter a password");
      return;
    }
    
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

  async function createAccount(username,email,password,firstName,lastName,birthdate) {
    const apiUrl = `http://${config.BASE_URL}:3000/api/users/register/individual`;

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
      console.error('Error:', error);
    }
  }