import DOMPurify from 'dompurify';

function validateInput(input, type) {
    let regex;

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
    console.log(DOMPurify.sanitize(input));
    return DOMPurify.sanitize(input);
}

export {validateInput, sanitizeInput};