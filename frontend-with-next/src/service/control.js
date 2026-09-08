
export const validateRegistration = ({
    password,
    confirmpassword,
    mobile,
}) => {
    const passwordValid = password.length >= 8;

    const confirmPasswordValid = password === confirmpassword;

    const phoneValid =
        /^01\d{9}$/.test(mobile);

    return {
        passwordValid,
        confirmPasswordValid,
        phoneValid,

        // All conditions
        registrationValid:
            passwordValid &&
            confirmPasswordValid &&
            phoneValid,
    };
};

export const validateLogin = ({ username, password }) => {
    const usernameValid = username.trim().length > 0;
    const passwordValid = password.length > 0;

    return usernameValid && passwordValid;
};