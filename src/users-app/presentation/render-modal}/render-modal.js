import second from "./render-modal.html?raw";
import './render-modal.css'
let modal, form;


export const showModal = () => {
    modal?.classList.remove('hide-modal');
}

export const hideModal = () => {
    modal?.classList.add('hide-modal');
}


/**
 * 
 * @param {HTMLDivElement} element 
 */

export const renderModal = (element) => {

    if (modal) {
        return
    }

    modal = document.createElement('div');
    modal.innerHTML = second;

    modal.className = 'modal-container hide-modal';
    form = modal.querySelector('form');

    modal.addEventListener('click', (event) => {
        if (event.target.className === 'modal-container') {
            hideModal();
        }

    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        console.log('form send!')
    });

    element.append(modal);
    1111111111111111111
        && TOMAR LA DATA DEL FORM EN UDEMY &&
            Build a Calculator app in ReactJS
    1111111111111111111
}