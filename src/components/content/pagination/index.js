const currentPaginationPage = document.querySelector('.pagination .active');
if (currentPaginationPage.previousElementSibling) currentPaginationPage.previousElementSibling.classList.add("prev-page");
if (currentPaginationPage.nextElementSibling) currentPaginationPage.nextElementSibling.classList.add("next-page");