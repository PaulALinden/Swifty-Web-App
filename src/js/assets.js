import DOMPurify from 'dompurify';

function validateInput(input, type) {
    let regex;

    // Check for whitespace 
    if (/\s/.test(input)) {
        return false; 
    }

    switch (type) {
        case 'letters':
            regex = /^[A-Za-z]+$/;
            break;
        case 'email':
            regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            break;
        case 'birthdate':
            regex = /^\d{4}-\d{2}-\d{2}$/;
            break;
        case 'lettersAndNumbers':
            regex = /^[A-Za-z0-9]+$/;
            break;
        default:
            return false;
    }

    return regex.test(input);
}

function sanitizeInput(input) {
    //console.log(DOMPurify.sanitize(input));
    return DOMPurify.sanitize(input);
}

function insertErrorMessage(message , type){
    let errorField = document.getElementById(`error-${type}`);
    errorField.textContent = message;
  }
  
  function removeErrorMessage(type){
    let errorField = document.getElementById(`error-${type}`);
    errorField.textContent = ''
  }

export {validateInput, sanitizeInput, insertErrorMessage, removeErrorMessage};