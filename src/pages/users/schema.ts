import * as yup from 'yup';

export const userSchema = yup.object().shape({
    firstname: yup.string().required('First name is required'),
    lastname: yup.string().required('Last name is required'),
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
    role: yup.string().required('Role is required'),
});
