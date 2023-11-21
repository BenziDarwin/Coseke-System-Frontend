import React from 'react';
import { Checkbox } from '@mui/material';
import {
    grey
} from '@mui/material/colors';
import { globalBlueColor } from '../data/constants';

interface ICheckboxComponentProps {
    disabled?: boolean;
    checked?: boolean;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>, role: string, action: string) => void;
    role?: string;
    action?: string;
}

const CheckboxComponent = ({
    disabled = false,
    checked = false,
    handleChange,
    role,
    action
}: ICheckboxComponentProps) => {

    return (
        <Checkbox
            onChange={(e) => handleChange?.(e, (role || ''), (action || ''))}
            disabled={disabled}
            checked={checked}
            sx={{
                color: `${checked ? globalBlueColor : grey[500]} !important`
            }}
        />
    );
};

export default CheckboxComponent;