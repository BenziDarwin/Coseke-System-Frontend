import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    Grid,
    Stack
} from '@mui/material';
import PermissionsDisplay, { IPermissions } from '../../components/permissions';
import { blue } from '@mui/material/colors';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
    globalBlueColor,
    moduleNames
} from '../../data/constants';
import { ICrud, IModule } from './interface';
import { getRoles } from '../../core/api';

const RolesCard = ({
    updateRolePermissionsFuntion,
    deleteRoleFunction,
    handleChange,
    permissionList,
}: {
    updateRolePermissionsFuntion?: () => void,
    deleteRoleFunction?: () => void;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>, role: string, action: string) => void;
    permissionList?: IModule
}) => {
    const [roles, setRoles] = useState([]);

    useEffect(()=> {
        (async () => {
            let res :any = await getRoles();
            setRoles(res);
        })()
 
    },[])

    return (
        <Grid container xs={12} spacing={2}>
            {roles.map((role:any) => {
                return(
                    <Grid item xs={4}>
                <Card sx={{ bgcolor: blue[50], boxShadow: 'none', p: 2 }}>
                    <Box>
                        <PermissionsDisplay 
                        handleChange={handleChange} 
                        role={`${role.roleName.charAt(0).toUpperCase()}${role.roleName.slice(1).toLowerCase()}`} 
                        permissions={{
                                read:role.permissions.includes("READ"), 
                                create:role.permissions.includes("WRITE"),
                                delete:role.permissions.includes("DELETE"),
                                update:role.permissions.includes("UPDATE") }} disabled={true} />
                        <Stack sx={{ justifyContent: 'end' }} direction="row" spacing={1}>
                            <Button
                                sx={{ textTransform: 'capitalize' }}
                                startIcon={<DeleteOutlineIcon />}
                                variant='outlined'
                                color='error'
                                onClick={deleteRoleFunction}
                                size='small'>Delete</Button>
                            <Button
                                onClick={updateRolePermissionsFuntion}
                                startIcon={<EditOutlinedIcon />}
                                variant='outlined'
                                size='small'
                                sx={{ border: `1px solid ${globalBlueColor}`, boxShadow: 'none', color: globalBlueColor, textTransform: 'capitalize' }}>Update</Button>
                        </Stack>
                    </Box>
                </Card>
            </Grid>
                )
            })}
        </Grid>
    );
};

export default RolesCard;
