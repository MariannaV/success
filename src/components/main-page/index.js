//хранилище данных по каждому .m-slider
const sliders = {}

function handleNavigationButtons(button, { isNextButton, isPrevButton } = {}) {
  const slider = button.closest('.m-slider'),
    slidesContainer = slider.querySelector('.section-slider-item-blocks'),
    slidesWidth = slidesContainer.children[0].offsetWidth,
    slidesGap = +getComputedStyle(slidesContainer).getPropertyValue('--horizontal-gap')

  if (!(slider.id in sliders))
    sliders[slider.id] = {
      currentSlideIndex: 0,
      buttonPrev: slider.querySelector('.slider-nav-prev'),
      buttonNext: slider.querySelector('.slider-nav-next'),
    }

  let { currentSlideIndex } = sliders[slider.id]

  const isNeedWillMove = () => {
    switch (true) {
      case isNextButton:
        return currentSlideIndex < slidesContainer.children.length - 1
      case isPrevButton:
        return currentSlideIndex > 0
      default:
        throw new Error('Некорректный тип кнопки')
    }
  }

  if (isNeedWillMove()) {
    let otherButton
    if (isNextButton) {
      currentSlideIndex++
      otherButton = sliders[slider.id].buttonPrev
    } else if (isPrevButton) {
      currentSlideIndex--
      otherButton = sliders[slider.id].buttonNext
    }
    otherButton.classList.remove('is-disabled')
  }

  slidesContainer.scrollLeft = (slidesWidth + slidesGap) * currentSlideIndex

  //проверяем заново с учётом изменившегося индекса
  if (!isNeedWillMove()) button.classList.add('is-disabled')

  //синхронизируем изменения по слайдеру
  sliders[slider.id].currentSlideIndex = currentSlideIndex
}
