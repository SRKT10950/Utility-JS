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
