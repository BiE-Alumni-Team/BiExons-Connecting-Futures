
export const validateRegistration = ({
    password,
    confirmpassword,
    mobile,
}) => {
    const passwordValid = password.length >= 8;

    const confirmPasswordValid =
        confirmpassword.length > 0 &&
        password === confirmpassword;

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
