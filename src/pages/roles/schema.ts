import * as yup from 'yup';

export const roleSchema = yup.object().shape({
    roleName: yup.string().required('Role name is required')
});
