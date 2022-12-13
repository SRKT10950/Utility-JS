import cssStyle from '@salesforce/resourceUrl/webCss';
import defaultPage from './defaultPage.html';
import pageOne from './pageOne.html';
/**
     * If sectionA is true, render pageOne. If sectionB is true, render
     * pageTwo.If none of the above are true, render defaultPage
     * @returns The currentPage variable is being returned.
     */
    render() {
        console.log('render event');
        let currentPage = defaultPage;
        // let currentPage = lastSection;
        if (this.sectionA === true) {
            //currentPage = lastSection;
            currentPage = pageOne;
        } else if (this.sectionB) {
            currentPage = pageTwo;
        }
        return currentPage;
    }

 /**
     * The renderedCallback() function is called after the component has been rendered or re-rendered
     */
    renderedCallback() {
        Promise.all([
            loadStyle(this, cssStyle)
        ]).then(() => {
            console.log('Files loaded');
        })
            .catch(error => {
                console.log(error.body.message);
            });
    }

/**
     * The function takes the value of the input field and assigns it to the corresponding property of
     * the draftObject
     * @param event - The event that triggered the function.
     */
    handleInput(event) {
        try {
            let fieldName = event.target.name;
            let fieldValue = event.target.value;
            switch (fieldName) {
                case 'fullName':
                    this.draftObject.firstName = fieldValue;
                    break;
                case 'maidenName':
                    this.draftObject.lastName = fieldValue;
                    break;
                default:
                    break;
            }
        } catch (error) {
            this.handleError(error);
        }
        console.log(JSON.stringify(this.draftObject));
    }
/**
     * The function is called when the user clicks on the "Back to Top" button. It scrolls the page to
     * the top and then initializes the dropdown values
     */
    topFunction() {
        const scrollOptions = {
            left: 0,
            top: 0,
            behavior: 'smooth'
        }
        window.scrollTo(scrollOptions);
    }
/**
     * It loops through all the input fields in the form and checks if they are valid. If they are not
     * valid, it sets the error message to the label of the first invalid field and scrolls to it
     * @returns A boolean value.
     */
    validate() {
        this.errorMsg = '';
        let isValid = true;
        let firstScroll = true;
        let inputFields = this.template.querySelectorAll('.validate');
        inputFields.forEach(inputField => {
            if (!inputField.checkValidity()) {
                inputField.reportValidity();
                isValid = false;
                if (firstScroll) {
                    this.errorMsg = inputField.label;
                    inputField.scrollIntoView();
                    firstScroll = false;
                }
            }
        });
        return isValid;
    }
/**
     * If the error is an array, then it's a UI API error, so we'll display the error message. If the
     * error is an object, then it's a JS error, so we'll display the error name, message, and line
     * number
     * @param error - The error object that was thrown.
     */
    handleError(error) {
        if (error) {
            let errorMg = 'Unknown error';
            let errorName = '';
            let errorStack = '';
            if (Array.isArray(error.body)) {
                errorMg = error.body.map(e => e.message).join(', ');
            }
            // UI API DML, Apex and network errors
            else if (error.body && typeof error.body.message === 'string') {
                errorName = error.body.exceptionType;
                errorMg = error.body.message;
                errorStack = error.stack;
            }
            else if (error.body && error.body.pageErrors && typeof error.body.pageErrors[0].message) {
                errorName = error.statusText + ' : ' + error.body.pageErrors[0].statusCode;
                errorMg = error.body.pageErrors[0].message;
                errorStack = error.status;
            }
            // JS errors
            else if (typeof error.message === 'string') {
                errorName = error.name;
                errorMg = error.message;
                errorStack = error.stack.split("\n")[2].split(":");
            } else {
                errorMg = JSON.stringify(error);
            }
            console.log('Error Name : ' + errorName);
            console.log('Error : ' + errorMg);
            console.log('Error Line :' + errorStack);
            console.log(JSON.stringify(error));
            this.showToast('Error : ' + errorName, errorMg, 'error', false);
        }
    }
//For standard toast
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

showToast(title, msg, typeOfToast, isSticky) {
		const eve = new ShowToastEvent({
			title: title,
			message: msg,
			variant: typeOfToast,
			mode: isSticky ? 'sticky' : 'dismissible'
		});

		this.dispatchEvent(eve);
    }

//For custom toast
/**
     * This function is used to show a toast message on the screen
     * @param title - The title of the toast
     * @param msg - The message you want to display in the toast.
     * @param typeOfToast - This is the type of toast you want to show. It can be one of the following:
     * @param isSticky - If true, the toast will not disappear after a few seconds.
     */
    showToast(title, msg, typeOfToast, isSticky) {
        this.template.querySelector('c-custom-toast').showToast(title, msg, typeOfToast, isSticky);
    }
