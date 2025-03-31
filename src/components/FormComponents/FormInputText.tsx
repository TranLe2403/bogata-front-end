import { SxProps, TextField, Theme } from '@mui/material';
import { FC } from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { GameFormType, GameInputType } from '../../types/GameType';

interface FormInputProps {
  name: keyof GameFormType;
  label: string;
  register: UseFormRegister<GameInputType>;
  error: FieldError | undefined;
  sx?: SxProps<Theme>;
  valueAsNumber?: boolean;
}

export const FormInputText: FC<FormInputProps> = ({ name, label, register, error, sx, valueAsNumber }) => {
  return (
    <TextField
      size="small"
      fullWidth
      label={label}
      variant="outlined"
      error={!!error}
      helperText={error?.message ?? ''}
      sx={sx}
      {...register(name, {valueAsNumber})}
    />
  );
};
