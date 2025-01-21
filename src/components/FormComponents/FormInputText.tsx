import { SxProps, TextField, Theme } from "@mui/material"
import { FC } from "react";
import { Controller } from "react-hook-form"

interface FormInputProps {
  name: string;
  control: any;
  label: string;
  sx?: SxProps<Theme>
}

export const FormInputText: FC<FormInputProps> = ({name, control, label, sx}) => {
  return (
  	<Controller
      name={name}
      control={control}
      render={(renderProps) => (
        <TextField
        	size="small"
          onChange={renderProps.field.onChange}
          value={renderProps.field.value}
          fullWidth
          label={label}
          variant="outlined"
					error={!!renderProps.fieldState.error ?? false}
					helperText={renderProps.fieldState.error?.message ?? ''}
          sx={sx}
        />
      )}
    />
  )
}