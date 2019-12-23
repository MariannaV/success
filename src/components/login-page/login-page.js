function showPassword(eventTarget) {
    const passwordInput = eventTarget.closest('.m-input__wrapper').querySelector('input');
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    eventTarget.classList.toggle('is-shown');
};

const validations = {
    required: () => value => !value && 'Поле обязательно',
    minLength: (kolichestvo) => value => value && value.length < kolichestvo && `Минимальная длина: ${kolichestvo} символов`,
    maxLength: (kolichestvo) => value => value && value.length > kolichestvo && `Максимальная длина: ${kolichestvo} символов`,
    onlyEnglishAndNumbers: () => value => value && !/^\w+$/.test(value) && `Разрешены только a-z, 0-9`,
};

document.querySelector('.login-form').addEventListener("submit", (event) => {
    event.preventDefault();
    const {target: form} = event,
        fields = ['login', 'password'].reduce((acc, currentField) => ({
            ...acc,
            [currentField]: form.querySelector(`[name=${currentField}]`)
        }), {});
    let isValid = true;

    [{
        fieldName: 'login',
        checks: [
            validations.required(),
            validations.minLength(5),
            validations.maxLength(10),
            validations.onlyEnglishAndNumbers()
        ]
    }].forEach(({fieldName, checks}) => {
        const field = fields[fieldName],
            {value} = field,
            errorsContainer = field.closest('fieldset').querySelector('.m-errors'),
            foundErrors = checks.map(check => check(value)).filter(Boolean);

        errorsContainer.innerHTML = '';

        if (foundErrors.length) {
            isValid = false;
            const fragment = document.createDocumentFragment();
            foundErrors.forEach(errorMessage => {
                const newError = document.createElement('p');
                newError.textContent = errorMessage;
                fragment.appendChild(newError)
            });
            field.classList.add('invalid');
            errorsContainer.appendChild(fragment);
        } else {
            field.classList.remove('invalid');
        }
    })

    if (isValid) {
        /* отправляем данные */
        form.classList.remove('invalid')
    } else {
        form.classList.add('invalid')
    }
});