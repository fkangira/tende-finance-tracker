// basic checks for the expense form

const descriptionPattern = /^(?!\s)(?!.*\s$).+$/;

const amountPattern = /^(0|[1-9]\d*)(\.\d{1,2})?$/;

const datePattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

const categoryPattern = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;

// this catches repeated words like "lunch lunch"
const duplicateWordPattern = /\b(\w+)\s+\1\b/i;

function validateDescription(value) {
    if (!descriptionPattern.test(value)) {
        return "Description should not start or end with a space.";
    }

    if (duplicateWordPattern.test(value)) {
        return "Description has a repeated word.";
    }

    return "";
}

function validateAmount(value) {
    if (!amountPattern.test(value)) {
        return "Enter a valid amount.";
    }

    return "";
}

function validateDate(value) {
    if (!datePattern.test(value)) {
        return "Enter the date as YYYY-MM-DD.";
    }

    return "";
}

function validateCategory(value) {
    if (!categoryPattern.test(value)) {
        return "Choose a valid category.";
    }

    return "";
}
