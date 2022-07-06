export enum ErrorMessageEnum {
    IsRequired = "Value is required",
    EmailIsNotValid = "Value is not a valid email address",
    EmailNotFound = "Firebase: Error (auth/user-not-found).",
    EmailInUse = "Firebase: Error (auth/email-already-in-use).",
    PasswordNotFound = 'Firebase: Error (auth/wrong-password).',
    PasswordMinLength = "This field should be at least 6 characters long",
    PasswordIsEqual = "The value must be equal to the other value"
}