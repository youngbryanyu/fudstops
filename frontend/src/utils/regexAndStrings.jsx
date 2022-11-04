// util file to help determine regex of email and phone numbers and manipulate strings

export const VALID_EMAIL_REGEX = /.+@.+\.[A-Za-z]+$/;
export const VALID_PHONE_REGEX = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/; // Francis Gagnon: from https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number


export const EMPTY_PHONE_STRING = " has no phone." // empty phone number contains this
export const EMPTY_EMAIL_STRING = " has no email." // empty email contains this

export const MIN_PASSWORD_LENGTH = 5;
export const MIN_USERNAME_LENGTH = 1;

/**
 *  Returns whether email address is in a valid format 
 */
export function isValidEmailFormat(input) {
    return VALID_EMAIL_REGEX.test(input);
}

/**
 * Returns whether input is a valid phone number format
 */
export function isValidPhoneFormat(input) {
    return VALID_PHONE_REGEX.test(input);
}

/**
 *  Returns whether input is in a valid email or phone number 
 */
export function isValidEmailOrPhoneFormat(input) {
    return isValidEmailFormat(input) || isValidPhoneFormat(input);
}

/**
 *  Returns whether password is valid
 */
export function isValidPasswordFormat(password) {
    return password.length >= MIN_PASSWORD_LENGTH;
}

/**
 *  Returns whether username is valid --> length >= 5 and no spaces
 */
export function isValidUsernameFormat(username) {
    return (username.length >= MIN_USERNAME_LENGTH && !username.includes(" "));
}

/**
 * Strips a phone number string of the non digit characters
 */
export function stripNonDigits(phoneNumber) {
    return phoneNumber.replace(/\D/g, '');
}

/**
 * Returns if the user has no phone number or email
 */
export function isEmptyPhoneOrEmail(input) {
    return input.includes(EMPTY_PHONE_STRING) || input.includes(EMPTY_EMAIL_STRING);
}