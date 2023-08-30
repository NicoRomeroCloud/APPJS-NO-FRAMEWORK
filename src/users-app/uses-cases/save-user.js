import Swal from "sweetalert2";
import { userModelToLocalHost } from "../mappers/user-to-localhost.mapper";
import { User } from "../models/user";
import { localHostUserToModel } from "../mappers/localhost-user.mapper";

/**
 * 
 * @param {LikeUser User>} userLike 
 */

export const saveUser = async (userLike) => {



    const user = new User(userLike);

    if (!user.firstName || !user.lastName) {
        Swal.fire(
            'Lo siento!',
            'Debes llenar todos los campos',
            'error'
        )
        throw 'llena todos los campos!'
    }


    const userToSave = userModelToLocalHost(user);

    let userChanged;

    if (user.id) {
        userChanged = await updaterUser(userToSave);

    } else {
        userChanged = await createUser(userToSave);
    }

    return localHostUserToModel(userChanged);

}

/**
 * 
 * @param {Like User>} user
 */

const createUser = async (user) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users`;
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const newUser = await res.json();

    console.log({ newUser });

    return newUser;

}

/**
 * 
 * @param {Like User>} user
 */

const updaterUser = async (user) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const updateUser = await res.json();

    console.log({ updateUser });

    return updateUser;

}