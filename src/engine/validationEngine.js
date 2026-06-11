export const validateField = (field, value) => {
    const rules = field.validate || {};

    // This is the required check if the user fill up this field or not 
    if (rules.required) {
        const empty =
            value === undefined ||
            value === null ||
            String(value).trim() === "";
        if (empty) return "This field is required.";
    }

    // If the field is not filled up then return null
    if (!value || String(value).trim() === "") return null;

    // This are the rules which will check the format of the field
    if (rules.isEmail) {
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value));
        if (!ok) return "Must be a valid email address.";
    }

    // This rull will check the formate of the mobile number
    if (rules.isPhone) {
        const ok = /^[+]?[\d\s\-(). ]{7,15}$/.test(String(value));
        if (!ok) return "Must be a valid phone number.";
    }

    // This check the minlenght of the field
    if (rules.minLength !== undefined) {
        if (String(value).length < Number(rules.minLength))
            return `Must be at least ${rules.minLength} characters.`;
    }

    // This check the maxlenght of the field
    if (rules.maxLength !== undefined) {
        if (String(value).length > Number(rules.maxLength))
            return `Cannot exceed ${rules.maxLength} characters.`;
    }

    // This check the min value of the field
    if (rules.min !== undefined) {
        if (Number(value) < Number(rules.min))
            return `Must be at least ${rules.min}.`;
    }

    // This check the max value of the field
    if (rules.max !== undefined) {
        if (Number(value) > Number(rules.max))
            return `Must be no more than ${rules.max}.`;
    }

    // This is the custom check
    if (rules.pattern) {
        try {
            const re = new RegExp(rules.pattern);
            if (!re.test(String(value)))
                return rules.patternMessage || "Invalid format.";
        } catch {
            // bad regex in schema — skip silently
        }
    }

    return null; // if all the check passed
};

export const validateAllFields = (fields, formValues) => {
    const errors = {};
    fields.forEach((field) => {
        const error = validateField(field, formValues[field.id]);
        if (error) errors[field.id] = error;
    });
    return errors;
};

export const isStepValid = (fields, formValues) =>
    Object.keys(validateAllFields(fields, formValues)).length === 0;