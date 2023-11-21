import axios from 'axios';
import { IRole } from './interface';
import { accessTokenKey } from '../../data/constants';
import { userUrl } from '../../core/baseURLs';

export const addRole = async ({ name, permissions, activities }: IRole) => {

    const customHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem(accessTokenKey)}`,
    };

    try {
        const response = await axios.post(
            `${userUrl}roles/add-role`,
            { roleName: name, permissions, activities },
            { headers: customHeaders }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const listRoles = async () => {

    const customHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem(accessTokenKey)}`,
    };

    try {
        const response = await axios.get(
            `${userUrl}roles/view-all-roles`,
            { headers: customHeaders }
        );
        return response.data;
    } catch (error) {
        console.log(error)
    }

}

export const updatePermissionsRole = async ({ name, permissions, activities }: IRole) => {
    const customHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem(accessTokenKey)}`,
    };

    try {
        const response = await axios.post(
            `${userUrl}roles/update-activities`,
            { roleName: name, permissions, activities },
            { headers: customHeaders }
        );
        return response.data;

    } catch (error) {
        console.log(error)
    }
}

export const deleteRole = async ({ name }: IRole) => {
    const customHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem(accessTokenKey)}`,
    };

    try {
        const response = await axios.post(
            `${userUrl}roles/delete-role`,
            { roleName: name },
            { headers: customHeaders }
        );
        return response.data;

    } catch (error) {
        console.log(error)
    }
}