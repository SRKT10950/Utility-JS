/**
 * It prevents the user from entering anything other than numbers, backspace, delete, arrow keys,
 * enter, and tab
 * @param event - The event object is a JavaScript event that is sent to an element when an event
 * occurs.
 */
function inputNumber(event) {
    const keyCode = event.keyCode;
    if ((keyCode >= 48 && keyCode <= 57) || keyCode == 188 || keyCode == 8 || (keyCode >= 96 && keyCode <= 105) || (keyCode >= 37 && keyCode <= 40) || keyCode == 13 || keyCode == 9) {
    } else {
        event.preventDefault();
    }
}
/**
 * It takes an array of objects and returns a string of the objects' label and value properties
 * @param obj - The object to be converted to a string.
 */
function objToString(obj) {
    let str = '';
    obj.forEach(element => {
        str += element.label + ' ' + element.value + '\n ';
    });
    return str;
}
