import React from 'react';
import {
    Box,
    FormControlLabel,
    FormGroup,
    Grid,
    Typography
} from '@mui/material';
import CheckboxComponent from '../CheckBox';
import {
    grey,
} from '@mui/material/colors';
import { crudState } from '../../data/constants';

export interface IPermissions {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
}

interface IPermissionsDisplay {
    role: string;
    permissions: IPermissions;
    disabled?: boolean;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>, role: string, action: string) => void;
}

const FormControlLabelComponent = ({ text }: { text: string; actionText: string; action: boolean }) => (
    <Typography sx={{ fontSize: '13px' }}>
        {text}
    </Typography>
);

const PermissionsDisplay = ({
    role,
    permissions,
    disabled,
    handleChange,
}: IPermissionsDisplay) => {
    return (
        <Grid container item xs={12}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ pb: 1 }}>
                    <Grid item xs={12}>
                        <Box sx={{ borderBottom: `1px solid ${grey[400]}`, width: '100%', display: 'flex' }}>
                            <Typography sx={{
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 600,
                                fontSize: '18px',
                                py: 1,
                            }} variant='h3'>
                                {role}
                                <Typography sx={{ ml: 1, fontSize: '12px' }}>Permissions</Typography>
                            </Typography>
                        </Box>
                    </Grid>
                    <FormGroup>
                        <FormControlLabel disabled={false} control={<CheckboxComponent
                            handleChange={handleChange}
                            action={crudState?.create}
                            role={role}
                            checked={permissions?.create}
                            disabled={disabled} />}
                        label={<FormControlLabelComponent action={permissions?.create} text="Create" actionText={`create ${role}`} />} />
                        <FormControlLabel disabled={false} control={<CheckboxComponent
                            handleChange={handleChange}
                            action={crudState?.read}
                            role={role}
                            checked={permissions?.read}
                            disabled={disabled} />}
                        label={<FormControlLabelComponent action={permissions?.read} text="Read" actionText={`view ${role}`} />} />
                        <FormControlLabel disabled={false} control={<CheckboxComponent
                            handleChange={handleChange}
                            action={crudState?.update}
                            role={role}
                            checked={permissions?.update}
                            disabled={disabled} />}
                        label={<FormControlLabelComponent action={permissions?.update} text="Update" actionText={`update ${role}`} />} />
                        <FormControlLabel disabled={false} control={<CheckboxComponent
                            handleChange={handleChange}
                            action={crudState?.delete}
                            role={role}
                            checked={permissions?.delete}
                            disabled={disabled} />}
                        label={<FormControlLabelComponent action={permissions?.delete} text="Delete" actionText={`delete ${role}`} />} />
                    </FormGroup>
                </Box>
            </Box>
        </Grid>
    );
};

export default PermissionsDisplay;