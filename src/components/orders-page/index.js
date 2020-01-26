if (flatpickr)
    flatpickr('.m-datepicker__container input', {
        dateFormat: "d.m.Y",
    });


function showChat(el){
    let chat = document.querySelector(".chat-section");
    chat.classList.add('active-chat');
    if (el.classList.contains('new-notification')){
        el.classList.remove('new-notification');
    }
}
function closeChat(el){
    let chat = document.querySelector(".chat-section");
    chat.classList.remove('active-chat');
}