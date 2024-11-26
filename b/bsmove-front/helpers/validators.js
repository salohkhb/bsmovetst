import validator from "validator";

export function isEmailValid(email) {
  return validator.isEmail(email);
}

export function isLastNameValid(lastName) {
  return !!lastName.match(/^[a-zA-Z- ]*$/);
}

export function isFirstNameValid(firstName) {
  return !!firstName.match(/^[a-zA-Z- ]*$/);
}

export function isPasswordValid(password) {
  return (
    validator.isLength(password, { min: 8, max: 50 }) &&
    !validator.isEmpty(password, { ignore_whitespace: true })
  );
}

export function isPhoneNumberValid(phoneNumber) {
  return phoneNumber.match(/^(?:(?:\+|00)33|0)\s*[6-7](?:[\s.-]*\d{2}){4}$/);
}

const ZIP_CODE_REGEX = /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/;

export function isZipCodeValid(zipCode) {
  if (!zipCode) return false;
  return zipCode.match(ZIP_CODE_REGEX);
}

export default {
  isEmailValid,
  isLastNameValid,
  isFirstNameValid,
  isPasswordValid,
  isPhoneNumberValid,
  isZipCodeValid,
};
