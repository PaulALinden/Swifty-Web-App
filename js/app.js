

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const logInButton = document.getElementById("submit");
  const signUpLink = document.getElementById("signup");

  logInButton.addEventListener("click", ev => {
    ev.preventDefault();

    const usernameValue = usernameInput.value;
    const passwordValue = passwordInput.value;

    //handel false inputs
    if (!usernameValue) {
      alert("Please enter a username");
      return;
    }else if(!passwordValue){
      alert("Please enter a password");
      return;
    }
    // Utveckla hantering av credentials
    sendCredentials(usernameValue, passwordValue);

  });

  async function sendCredentials(username, password) {
    console.log("Fetching")
    const apiUrl = "http://localhost:3000/api/users/loginUser"

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



