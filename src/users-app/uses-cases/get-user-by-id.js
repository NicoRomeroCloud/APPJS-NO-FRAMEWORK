import { localHostUserToModel } from "../mappers/localhost-user.mapper";

/** 
*
*@param {String | Number} id
// *@returns {Promise<User>}
*/
export const getUserById = async (id) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;

    const res = await fetch(url);

    const data = await res.json();

    const user = localHostUserToModel(data);

    console.log({ user })

    return user;
}