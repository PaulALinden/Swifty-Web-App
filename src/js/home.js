import config from './config';
//Log in
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const logInButton = document.getElementById("submit");
  const signUpLink = document.getElementById("signuplink");


  logInButton.addEventListener("click", ev => {
    ev.preventDefault();

    const usernameValue = usernameInput.value;
    const passwordValue = passwordInput.value;

    //handle false inputs
    if (!usernameValue) {
      alert("Please enter a username");
      return;
    }else if(!passwordValue){
      alert("Please enter a password");
      return;
    }
    // further dev....
    sendCredentials(usernameValue, passwordValue);

  });

  async function sendCredentials(username, password) {
    const apiUrl = `http://${config.BASE_URL}:3000/api/users/loginUser`

    const postData = {
      username: username.toString().toLowerCase(),
      password: password.toString().toLowerCase()
    };
    console.log("Sending to server")

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

  



