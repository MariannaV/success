let checkboxies = [...document.querySelectorAll('.m-filter__container>input[type="checkbox"]')];

function addAttributeChecked() {
    checkboxies.forEach(el => el.checked=true);
}
