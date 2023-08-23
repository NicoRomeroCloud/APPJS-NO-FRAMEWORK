import Swal from "sweetalert2";
import { userModelToLocalHost } from "../mappers/user-to-localhost.mapper";
import { User } from "../models/user";

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

    if (user.id) {
        throw 'Update not implemented'
        return;
    }

    const updateUser = await createUser(userToSave);

    return updateUser;
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