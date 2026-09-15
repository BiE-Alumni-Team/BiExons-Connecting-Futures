
export const validateRegistration = ({
    password,
    confirmpassword,
    mobile,
    id
}) => {
    const passwordValid = password.length >= 8;

    const confirmPasswordValid = password === confirmpassword;

    const phoneValid =
        /^01\d{9}$/.test(mobile);

    // Current year: 2026 -> 26
    const currentYear = new Date().getFullYear() % 100;

    // Validate 7-digit ID: YY09XXX
    const idValid =
        /^\d{7}$/.test(id) &&
        Number(id.slice(0, 2)) >= 21 &&
        Number(id.slice(0, 2)) <= currentYear &&
        id.slice(2, 4) === "09" &&
        Number(id.slice(4, 7)) < 31;

    return {
        passwordValid,
        confirmPasswordValid,
        phoneValid,
        idValid,

        // All conditions
        registrationValid:
            passwordValid &&
            confirmPasswordValid &&
            phoneValid &&
            idValid,
    };
};

export const validateLogin = ({ email, password }) => {
    const emailValid = email.trim().length > 0;
    const passwordValid = password.length > 0;

    return emailValid && passwordValid;
};