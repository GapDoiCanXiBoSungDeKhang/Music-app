export const isValidPassword = (password: string) => {
    const hasLower = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasNoWhitespace = /^\S+$/.test(password);
    const hasLength = password.length >= 8;

    return hasLower && hasDigit && hasNoWhitespace && hasLength;
}