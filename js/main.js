const Selector = {
    discussQuestionForm: '.discuss-question-form',
    orderProjectForm: '#orderProjectForm',

    openOrderProjectModalBtn: '[data-bs-target="#orderProjectModal"]',
    orderProjectModal: '#orderProjectModal',
    orderProjectForm: '#orderProjectForm',
    orderProjectFormSubmitBtn: '#orderProjectFormSubmitBtn',
};

/* Список url по которым производится отправка запросов */
const Urls = {
    orderProject: "/php/order-form.php",
    discussQuestion: "/php/discuss-form.php",
};

let isMobileMenuOpen = false;

/**
 * Переключает показ мобильного меню
 * 
 * @return {void}
 */
function openMobileMenu() {
    document.querySelector('.mobile-menu-wrapper').style.marginTop = !isMobileMenuOpen ? '0' : '-100vh';

    if (isMobileMenuOpen) {
        document.querySelector('.mobile-menu-wrapper').style.marginTop = '-100vh';
        document.querySelector('body').style.overflow = 'scroll';

        document.querySelector('.burger-wrapper').style.display = 'block';
        document.querySelector('.close-mobile-menu-btn-wrapper').style.display = 'none';

        console.log('closes');
    } else {
        let menuMarginTop = document.documentElement.scrollTop;

        document.querySelector('.mobile-menu-wrapper').style.marginTop = `calc(${menuMarginTop}px)`;
        document.querySelector('body').style.overflow = 'hidden';

        document.querySelector('.burger-wrapper').style.display = 'none';
        document.querySelector('.close-mobile-menu-btn-wrapper').style.display = 'block';
    }

    isMobileMenuOpen = !isMobileMenuOpen;
}

/**
 * Валидирует форму на пустые поля
 * 
 * @param {dom_element} form DOM-элемент формы
 * 
 * @return {boolean}
 */
function isFormValid(form) {
    if (form.checkValidity()) {
        form.classList.remove('was-validated');
        return true;
    }

    form.classList.add('was-validated');
    return false;
}

/**
 * Отправляет данные формы по заданной ссылке 
 * 
 * @param {element} form Элемент формы
 * @param {string} url Url по которому отправляется форма
 * @param {callback} callback Функция, которая вызывается после выполения запроса
 * 
 * @return {void}
 */
function sendForm(form, url, callback = null) {
    if (!isFormValid(form)) {
        showModal(`Заполните форму!`);

        return;
    }

    let formData = new FormData(form);
    let xhr = new XMLHttpRequest();

    xhr.open('POST', url, false);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.send(formData);

    if (xhr.status !== 200) {
        showModal(`Отправка формы не удалась! Повторите попытку позже.`);
        return;
    }

    showModal(`Ваша заявка успешно отправлена!`);
    form.classList.remove('was-validated');
    form.reset();

    if (callback !== null && callback !== undefined) {
        callback();
    }
}

/** Отправляет форму заявки */
function sendDiscussQuestionForm(event) {
    event.preventDefault();
    sendForm(event.target, Urls.discussQuestion);
}

/** Отправляет форму заказа проекта */
function sendOrderProjectForm(event) {
    event.preventDefault();
    let form = document.querySelector(Selector.orderProjectForm);

    sendForm(form, Urls.orderProject, function() {
        let orderProjectModal = document.querySelector(Selector.orderProjectModal);
        let modal = bootstrap.Modal.getInstance(orderProjectModal);
        modal.hide();
    });
}

/**
 * Отображает alert
 * 
 * @param {string} message Сообщение alert-а
 * 
 * @return {void}
 */
function showModal(message) {
    let alertElement = document.querySelector('#alert');
    let modal = new bootstrap.Modal(alertElement); 
    
    alertElement.querySelector('.alert-text-content').innerText = message;
    modal.show();
    
    setTimeout(function() {
        modal.hide();
    }, 1000);
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.mobile-menu__burger').addEventListener('click', openMobileMenu);
    document.querySelector('.close-mobile-menu-btn-wrapper').addEventListener('click', openMobileMenu);

    document.querySelector(Selector.orderProjectFormSubmitBtn).addEventListener('click', sendOrderProjectForm);
    document.querySelectorAll(Selector.discussQuestionForm).forEach(function(element) {
        element.addEventListener('submit', sendDiscussQuestionForm);
    });
});
