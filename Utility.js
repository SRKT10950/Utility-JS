/**
 * It prevents the user from entering anything other than numbers, the decimal point, the backspace
 * key, the arrow keys, the enter key, and the tab key
 * @param event - The event object is a JavaScript event that is sent to an element when an event
 * occurs on the element.
 */
function inputNumber(event) {
    let keyArray = [110, 190, 8, 13, 9];
    const keyCode = event.keyCode;
    if (!((keyCode >= 48 && keyCode <= 57) || keyArray.includes(keyCode) || (keyCode >= 96 && keyCode <= 105) || (keyCode >= 37 && keyCode <= 40))) {
        event.preventDefault();
    }
}
/**
 * It takes an array of objects and returns a string of the objects' label and value properties
 * @param {string}obj - The object to be converted to a string.
 */
function objToString(obj) {
    let str = '';
    obj.forEach(element => {
        str += element.label + ' ' + element.value + '\n ';
    });
    return str;
}

/**
 * It takes an array of objects, sorts them by their label property, and returns the sorted array
 * @param {String}obj - The object you want to sort.
 * @returns The sortedObj array.
 */
function ObjectSort(obj) {
    let sortedObj = [];
    sortedObj = obj.sort((a, b) => a.label.localeCompare(b.label));
    return sortedObj;
}
 /**
     * The function checks if a given date string is valid or not.
     * @param dateString - a string representing a date in the format "dd/mm/yyyy" (day/month/year)
     * @returns a boolean value indicating whether the input string is a valid date in the format
     * "dd/mm/yyyy".
     */
    dateValidation(dateString) {
        // First check for the pattern
        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
            return false;
        // Parse the date parts to integers
        let parts = dateString.split("/");
        let day = parseInt(parts[0], 10);
        let month = parseInt(parts[1], 10);
        let year = parseInt(parts[2], 10);
        // Check the ranges of month and year
        if (year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;
        let monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        // Adjust for leap years
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;
        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
    }

/**
 * It takes a selector as an argument and returns true if all the input fields that match the selector
 * are valid
 * @param selector - The selector for the input fields you want to validate.
 * @returns A boolean value.
 */
function isInputValid(selector) {
  let isValid = true;
  let inputFields = this.template.querySelectorAll(selector);
  inputFields.forEach(inputField => {
    if (!inputField.checkValidity()) {
      inputField.reportValidity();
      isValid = false;
    }
  });
  return isValid;
}
