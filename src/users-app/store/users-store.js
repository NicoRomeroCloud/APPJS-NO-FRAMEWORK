import { loadUsers } from "./load-users";
import { renderButtons } from "../presentation/render-buttons/render-buttons";
import Swal from "sweetalert2";

const state = {
    currentPage: 0,
    users: [],
}

const loadNextPage = async () => {

    const users = await loadUsers(state.currentPage + 1);

    if (users.length === 0) return;

    state.currentPage++;

    state.users = users;

}

const loadPreviustPage = async () => {

    if (state.currentPage === 1) {
        Swal.fire(
            'Lo siento!',
            'No hay página 0, o si?...',
            'question'
        )
        return
    }

    const users = await loadUsers(state.currentPage - 1);
    state.users = users;

    state.currentPage--;
}

//TO DO: implemented
const onUserChanged = () => {

    throw new Error('No implemented');

}


const reloadPage = () => {

    throw new Error('No implemented');

}

export default {
    loadNextPage,
    loadPreviustPage,
    onUserChanged,
    reloadPage,

    /**
     * @returns {User[]}
     */

    getUsers: () => [...state.users],

    /**
     * @returns {Number}
     */

    getCurrentPage: () => state.currentPage,
}