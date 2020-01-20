const accordion = {
    init: ({selector = '.accordion', closeOnMouseLeave = true} = {}) =>
        [...document.querySelectorAll(selector)].forEach(accordionItem => {
            accordionItem.addEventListener("mouseenter", () => accordionItem.setAttribute("open", "open"));
            if (closeOnMouseLeave)
                accordionItem.addEventListener("mouseleave", () => accordionItem.removeAttribute("open"));
        })
};


if (window.matchMedia("(max-width: 1023px)").matches) {
    window.toggleMenu = () => document.body.classList.toggle('isMenuShowing');

    const userBlock = document.querySelector('.about-user-block');
    window.closeUserBlock = () => {
        if (userBlock.hasAttribute('open'))
            userBlock.removeAttribute('open');
    }
}


if (window.matchMedia("(min-width: 1024px)").matches) {
    document.getElementById('searchInput').setAttribute('placeholder', 'Поиск строительных и отделочных материалов');
    accordion.init();
    accordion.init({selector: '.catalog-menu .menu-item:not(.isEmpty)', closeOnMouseLeave: false});

    if ('IntersectionObserver' in window) {
        const headerMiddle = document.querySelector('.header-middle');
        (new IntersectionObserver(events =>
                    events.forEach(({isIntersecting}) => headerMiddle.classList[isIntersecting ? 'remove' : 'add']('isFixed')),
                {rootMargin: `-${headerMiddle.offsetHeight}px`})
        ).observe(document.querySelector('.header-bottom'));
    }
}


const getScreenName = (screenWidth) => screenWidth >= 1024 ? 'desktop' : 'mobile';
let lastScreen = getScreenName(window.innerWidth);
window.addEventListener("resize", function () {
    const currentScreen = getScreenName(window.innerWidth);
    if (lastScreen !==  currentScreen) {
        lastScreen = currentScreen;
        location.reload();
    }
}, false);



