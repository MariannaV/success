const productHandlers = {
  description: {
    navigation: {
      onToggleActiveTab: event => {
        event.stopPropagation()
        const { currentTarget: container, target: activeEl } = event
        if (activeEl.classList.contains('product-description__navigation-block')) {
          if (window.matchMedia('(min-width: 768px)').matches)
            container.querySelector('.active-tab').classList.remove('active-tab')
          activeEl.classList.toggle('active-tab')
        }
      },
    },
  },
}

if (window.matchMedia('(max-width: 767px)').matches)
  [...document.querySelectorAll(".product-description__content > input[type='radio']")].forEach(el =>
    el.setAttribute('type', 'checkbox')
  )
