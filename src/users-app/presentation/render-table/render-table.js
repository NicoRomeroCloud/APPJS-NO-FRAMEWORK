import "./render-table.css";
import userStore from "../../store/users-store";
import { deleteUser } from "../../uses-cases/delete-user-by-id";
import { showModal } from "../render-modal}/render-modal";
import Swal from "sweetalert2";
import usersStore from "../../store/users-store";
import { User } from "../../models/user";

let table;
const createTable = () => {
    const table = document.createElement('table');
    const tableHeaders = document.createElement('thead');
    tableHeaders.innerHTML = `
        <tr>
            <th>#ID</th>
            <th>Balance</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
    `;

    const tableBody = document.createElement('tbody');
    table.append(tableHeaders, tableBody)
    return table;

}

/**
 * 
 * @param {MouseEvent} event 
 */
const tableSelectListener = (event) => {
    const element = event.target.closest('.select-user');
    if (!element) return;

    const id = element.getAttribute('data-id');
    showModal(id);
}


/**
 * 
 * @param {MouseEvent} event 
 */
const tableDeleteListener = async (event) => {
    const element = event.target.closest('.delete-user');
    if (!element) return;

    const id = element.getAttribute('data-id');

    try {
        await deleteUser(id);
        await usersStore.reloadPage();
        document.querySelector('#current-page').innerText = usersStore.getCurrentPage();
        renderTable();
        Swal.fire(
            'EXITO!',
            `Usuario eliminado correctamente`,
            'success'
        )
    } catch (error) {
        console.log(error);
        Swal.fire(
            'Lo siento!',
            'No se pudo eliminar',
            'error'
        )
    }


}

/**
 * 
 * @param {HTMLDivElement} element 
 */

export const renderTable = (element) => {


    const users = userStore.getUsers();

    if (!table) {
        table = createTable();
        element.append(table);

        //TODO: listeners a la table.

        table.addEventListener('click', tableSelectListener);

        table.addEventListener('click', tableDeleteListener);

    }


    let tableHtml = '';
    users.forEach(user => {
        tableHtml += `
            <tr>
                <td>${user.id}</td>
                <td>${user.balance}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.isActive}</td>
                <td>
                    <a href="#/" class="select-user" data-id="${user.id}" >Select</a>
                    |
                    <a href="#/" class="delete-user" data-id="${user.id}" >Delete</a>

                </td>
            </tr>
    `;
    });

    table.querySelector('tbody').innerHTML = tableHtml;

}