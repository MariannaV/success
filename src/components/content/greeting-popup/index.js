const greetingPopup = createPopup('greeting-popup');
setTimeout(greetingPopup.show, 1000);


function createPopup(popupName) {
    const popup = {
        get wrapper() {
            return document.querySelector(`.popup__wrapper.${popupName}`)
        },
        get content() {
            return popup.wrapper.querySelector('.popup-block')
        },
        get animationDuration() {
            return +getComputedStyle(popup.content).getPropertyValue('--animationDuration')
        },
    };

    return {
        show: () => {
            const {wrapper, content} = popup;
            wrapper.classList.add('active');
            content.classList.remove('zoomOut');
            content.classList.add('zoomIn');
        },
        hide: () => {
            const {wrapper, content, animationDuration} = popup;
            content.classList.remove('zoomIn');
            content.classList.add('zoomOut');
            setTimeout(() => wrapper.classList.remove('active'), animationDuration);
        }
    }
}