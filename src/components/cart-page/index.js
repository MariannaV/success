if (flatpickr) flatpickr('.m-datepicker__container input', {
    dateFormat: "d.m.Y"
});

const labelHandlers = {
    onClick: event => {
        event.stopPropagation();
        const {
                currentTarget: container,
                target: activeEl
            } = event,
            label = container.querySelector('label');

        if (activeEl.classList.contains('delivery-method-title')) {
                container.querySelector('.active-label').classList.remove('active-label');
            activeEl.classList.toggle('active-label');
        }
    }
};

function addMethodDelivery(el) {
    const container = el.closest(".fieldsets-container");
    container.dataset.delivery = el.dataset.value;
}