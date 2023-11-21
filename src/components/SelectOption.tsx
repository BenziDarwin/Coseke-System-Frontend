import React from 'react';
import {
    Select,
    MenuItem,
    InputLabel,
    SelectChangeEvent,
    Box
} from '@mui/material';

export interface ISelectOption {
    value: string | number;
    label: string;
}

interface SelectProps {
    options: ISelectOption[];
    label?: string;
    onChange: (value: string) => void;
    id: string;
    value?: string
}

const SelectOption: React.FC<SelectProps> = ({ options, label, onChange, id, value }) => {
    const handleChange = (event: SelectChangeEvent<string>) => {
        onChange(event.target.value as string);
    };

    const determineAttributes = (option: ISelectOption, attr: string) => {
        if ('value' in option) {
            return attr === 'label' ? option.label : option.value;
        }
    };

    return (
        <Box>
            {label && <InputLabel>{label}</InputLabel>}
            <Select
                sx={{ width: '100%' }}
                size='small'
                label={label}
                id={id}
                value={value}
                onChange={handleChange}>
                {options.map((option) => (
                    <MenuItem
                        key={determineAttributes(option, 'key')}
                        value={determineAttributes(option, 'value')}>
                        {determineAttributes(option, 'label')}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    );
};

export default SelectOption;