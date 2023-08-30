import { loadUsers } from "./load-users";
import { renderButtons } from "../presentation/render-buttons/render-buttons";
import Swal from "sweetalert2";
import { User } from "../models/user";

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
        return;
    }

    const users = await loadUsers(state.currentPage - 1);
    state.users = users;

    state.currentPage--;
}

/**
 * 
 * @param {User} updaterUser 
 */
const onUserChanged = (updaterUser) => {

    let wasFound = false;

    state.users = state.users.map(user => {
        if (user.id === updaterUser.id) {
            wasFound = true;
            return updaterUser;
        }
        return user;
    });

    if (state.users.length < 10 && !wasFound) {
        state.users.push(updaterUser);
    }

}


const reloadPage = async () => {

    const users = await loadUsers(state.currentPage);

    if (users.length === 0) {
        await loadPreviustPage();
        return;
    };
    state.users = users;

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