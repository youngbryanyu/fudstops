// util file to help determine regex of email and phone numbers

const VALID_EMAIL_REGEX = /.+@.+\.[A-Za-z]+$/;
const VALID_PHONE_REGEX = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/; // Francis Gagnon: from https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number

const EMPTY_PHONE_STRING = " has no phone." // empty phone number contains this
const EMPTY_EMAIL_STRING = " has no email." // empty email contains this

/**
 *  Returns whether email address is in a valid format 
 */
function isValidEmailFormat(input) {
    return VALID_EMAIL_REGEX.test(input);
}

/**
 * Returns whether input is a valid phone number format
 */
function isValidPhoneFormat(input) {
    return VALID_PHONE_REGEX.test(input);
}

/**
 * Strips a phone number string of the non digit characters
 */
function stripNonDigits(phoneNumber) {
    return phoneNumber.replace(/\D/g, '');
}