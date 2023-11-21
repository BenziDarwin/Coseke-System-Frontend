import React,
{
    useEffect,
    useState
} from 'react';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Stack,
    Typography
} from '@mui/material';



import {
    Controller,
    useForm
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { roleSchema } from './schema';
import {
    permissionListMock,
    permissions,
} from './initialPermissions';
import RolesCard from './RolesCard';
import {
    addRole,
    deleteRole,
    listRoles,
    updatePermissionsRole,
} from './role_api';

import { IModule, IRole, def } from './interface';
import { PageHeader } from '../../components/Headers';
import ModalComponent from '../../components/ModelComponent';
import { BootstrapInput } from '../../components/Input';
import { globalBlueColor, globalTextColor, rolesListMock } from '../../data/constants';
import { getRoles } from '../../core/api';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
};

const Roles = () => {
    const [currentRole, setCurrentRole] = useState<string>('');
    const [rolesList, setRolesList] = useState<any[]>(rolesListMock)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [permissionList, setPermissionList] = React.useState<IModule>(def);
    const [allPermissionList, setAllPermissionList] = React.useState<{ [key: string]: IModule }>({ permissionListMock });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, role: string, action: string) => {
        console.log(permissionList)
        setPermissionList({
            ...permissionList,
            [role]: {
                ...permissionList[role],
                [action]: event.target.checked
            }
        });
    };

    useEffect(() => {
        (async() => {
            let res :any = await getRoles();
            res.map((role:any) => {
                let arr = {
                    read:role.permissions.includes("READ"), 
                    create:role.permissions.includes("WRITE"),
                    delete:role.permissions.includes("DELETE"),
                    update:role.permissions.includes("UPDATE") }
                setPermissionList({
                    ...permissionList,
                    [`${role.roleName.charAt(0).toUpperCase()}${role.roleName.slice(1).toLowerCase()}`]: arr
                });
            })
        })()
    },[])

    const handleSelectChange = (value: string) => {
        setCurrentRole(value);
    };

    useEffect(() => {
        setCurrentRole('admin');
    }, []);

    useEffect(() => {
        const val = currentRole.toLowerCase();
        setPermissionList(allPermissionList[val]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentRole])

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<{ roleName: string }>({
        mode: 'onChange',
        resolver: yupResolver(roleSchema)
    });

    const onSubmit = async (formData: { roleName: string }) => {
        const response = await addRole({
            name: formData.roleName,
            permissions: ["READ", "WRITE", "DELETE", "UPDATE"],
            activities: [""]
        });
        console.log(response)
    };

    const listRolesFunction = async () => {
        const response = await listRoles() as unknown as Array<IRole>
        
    }

    useEffect(() => {
        listRolesFunction();
    }, []);

    const updateRolePermissionsFuntion = async () => {

        const response = await updatePermissionsRole({
            name: currentRole,
            permissions: ["READ", "WRITE", "DELETE", "UPDATE"],
        });

        console.log(response);
    }

    const deleteRoleFunction = async () => {
        const response = await deleteRole({
            name: "Test"
        });
        console.log(response)
    }

    return (
        <Box>
            {
                open && (<ModalComponent style={style} handleClose={handleClose} open={open}>
                    <>
                        <form autoComplete='false' onSubmit={handleSubmit(onSubmit)}>
                            <Typography id="modal-modal-title" variant="h6" sx={{ fontWeight: 'bold' }} component="h2">
                                Create new Role
                            </Typography>
                            <Box sx={{ mt: 2 }}>
                                <FormControl fullWidth>
                                    <Controller
                                        control={control}
                                        name='roleName'
                                        rules={{ required: true }}
                                        render={({ field: { onChange, onBlur } }) => (
                                            <BootstrapInput
                                                size='small'
                                                id='roleName'
                                                label='Role Name'
                                                variant="outlined"
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                error={Boolean(errors.roleName)}
                                            />
                                        )}
                                    />
                                    {errors.roleName && (
                                        <FormHelperText sx={{ color: 'error.main' }}>{errors.roleName.message}</FormHelperText>
                                    )}
                                </FormControl>
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
                                        border: `1px solid`,
                                        boxShadow: 'none',
                                        bgcolor: `${globalBlueColor}`,
                                        textTransform: 'capitalize'
                                    }}>Create</Button>
                            </Stack>
                        </form>
                    </>
                </ModalComponent>)
            }
            <PageHeader
                rolesList={rolesList}
                currentRole={currentRole}
                handleSelectChange={handleSelectChange}
                handleOpen={handleOpen}
                module='Role'
                title={`${currentRole} Permissions Management`} />

            <RolesCard
                deleteRoleFunction={deleteRoleFunction}
                handleChange={handleChange}
                updateRolePermissionsFuntion={updateRolePermissionsFuntion}
                permissionList={permissionList} />
        </Box>
    );
};

export default Roles;
