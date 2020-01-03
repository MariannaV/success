const inputHandlers = {
    onClick: (event) => {
        event.stopPropagation();
        const {currentTarget: container, target: activeEl} = event,
            input = container.querySelector('input');

        switch (input.type) {
            case 'number': {
                if (activeEl.tagName === 'BUTTON') {
                    input.value = +input.value + 1 * (activeEl.name === 'plus' ? 1 : -1);
                }
                break;
            }

            default: break;
        }
    }
};

[...document.querySelectorAll('.m-input__container')].forEach(input =>
  input.addEventListener('click', inputHandlers.onClick)
);