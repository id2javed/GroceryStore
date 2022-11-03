// Common Validation Script

console.log("*** Common Validation Script ***");

function isEmpty(inputValue) {
    if (inputValue == '') {
        return true;
    }
    return false;
}

function isNumber(userNameValue) {
    for (let ch of userNameValue) {
        if (ch >= 0 && ch <= 9) {
            return true;
        }
    }
    return false;
}

function isNumeric(event) {
	if (event.which >= 48 && event.which <= 57) {
		event.preventDefault();
		return true;
	}
	return false;
}

function isLetters(event) {
	if (event.which >= 65 && event.which <= 90) {
		event.preventDefault();
		return true;
	} else if (event.which >= 95 && event.which <= 122) {
		event.preventDefault();
		return true;
	}
	return false;
}

function isLettersLength(event) {
	if(event.target.value.length > 10) {
		event.preventDefault();
        return true;
    }
	return false;
}
