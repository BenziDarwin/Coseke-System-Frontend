import React, { useEffect, useState } from 'react'
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    Stack,
    Typography
} from '@mui/material';
import {
    Controller,
    useForm
} from 'react-hook-form';
import { BootstrapInput } from '../../components/Input';
import {
    globalBlueColor,
    rolesListMock
} from '../../data/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { userSchema } from './schema';
import { IUser } from './interface';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SelectOption, { ISelectOption } from '../../components/SelectOption';

import { formatResponseList } from '../../functions/helpers';
import { addUser } from './user_api';
import { IRole } from '../roles/interface';
import { getRoles } from '../../core/api';

interface ICreateUser { handleClose: () => void; }

const CreateUser = ({
    handleClose
}: ICreateUser) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [rolesList, setRolesList] = useState<ISelectOption[]>(rolesListMock)

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<IUser>({
        mode: 'onChange',
        resolver: yupResolver(userSchema)
    });

    const onSubmit = async (formData: IUser) => {
        const response = await addUser(formData);
        console.log(response, "response data!!!");
    };

    const listRolesFunction = async () => {
        const response = await getRoles() as unknown as Array<IRole>;
        setRolesList(formatResponseList(response));
    }

    useEffect(() => {
        listRolesFunction();
    }, []);

    return (
        <>
            <form autoComplete='false' onSubmit={handleSubmit(onSubmit)}>
                <Typography id="modal-modal-title" variant="h6" sx={{ fontWeight: 'bold' }} component="h2">
                    Create new User
                </Typography>
                <Box sx={{ mt: 2 }}>
                    <Grid container xs={12} spacing={2}>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <Controller
                                    control={control}
                                    name='firstname'
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur } }) => (
                                        <BootstrapInput
                                            size='small'
                                            id='firstname'
                                            label='First Name'
                                            variant="outlined"
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.firstname)}
                                        />
                                    )}
                                />
                                {errors.firstname && (
                                    <FormHelperText sx={{ color: 'error.main' }}>{errors.firstname.message}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <Controller
                                    control={control}
                                    name='lastname'
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur } }) => (
                                        <BootstrapInput
                                            size='small'
                                            id='lastname'
                                            label='Last Name'
                                            variant="outlined"
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.lastname)}
                                        />
                                    )}
                                />
                                {errors.lastname && (
                                    <FormHelperText sx={{ color: 'error.main' }}>{errors.lastname.message}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <Controller
                                    control={control}
                                    name='email'
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur } }) => (
                                        <BootstrapInput
                                            size='small'
                                            id='email'
                                            label='Email address'
                                            variant="outlined"
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.email)}

                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="start"
                                                        >
                                                            <EmailOutlinedIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                                {errors.email && (
                                    <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <Controller
                                    control={control}
                                    name='password'
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur } }) => (
                                        <BootstrapInput
                                            size='small'
                                            id='password'
                                            label='Password'
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            error={Boolean(errors.password)}
                                            type={showPassword ? 'text' : 'password'}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                                {errors.password && (
                                    <FormHelperText sx={{ color: 'error.main' }}>{errors.password.message}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl size='small' fullWidth>
                                <Controller
                                    control={control}
                                    name='role'
                                    rules={{ required: true }}
                                    render={({ field: { onChange } }) => (
                                        <SelectOption
                                            id="role"
                                            onChange={onChange}
                                            options={rolesList}
                                            label='role'
                                        />
                                    )}
                                />
                                {errors.role && (
                                    <FormHelperText sx={{ color: 'error.main' }}>{errors.role.message}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
                <Stack mt={2} sx={{ justifyContent: 'end' }} direction="row" spacing={1}>
                    <Button
                        onClick={handleClose}
                        sx={(theme) => ({
                            textTransform: 'capitalize',
                            color: theme.palette.grey[800]
                        })} variant='outlined' size='small'>Cancel</Button>
                    <Button
                        type='submit'
                        variant='contained'
                        size='small'
                        sx={{
                            border: `1px solid ${globalBlueColor}`,
                            boxShadow: 'none',
                            bgcolor: globalBlueColor,
                            textTransform: 'capitalize'
                        }}>Create</Button>
                </Stack>
            </form>
        </>
    )
}

export default CreateUser;