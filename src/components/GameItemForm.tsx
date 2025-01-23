import { FC } from 'react';
import { GameInputType } from '../types/GameType';
import { Box, Button, Modal } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { FormInputText } from './FormComponents/FormInputText';
import { SelectFormField } from './FormComponents/SelectFormField';

interface GameItemModalType {
  gameInfo?: GameInputType | null
  handleSubmitGame:(data: FieldValues) => Promise<void>
  open: boolean
  onClose: () => void
}

const DEFAULT_GAME_VALUE = {
  name: '',
  genres: [],
  minPlayer: 0,
  description: '',
  maxPlayer: 0,
  playDuration: 0,
  available: true,
  pictures: [],
  size: 'normal',
  minAge: 0,
  condition: '',  
}

const GameSchemaYup = yup.object({
  name: yup.string().required('Name is required'),
  minPlayer: yup.number().positive().integer().required('minplayer is required'),
  maxPlayer: yup.number().positive().integer(),
  description: yup.string(),
  playDuration: yup.number().positive().integer().required('playDuration is required'),
  minAge: yup.number().positive().integer().required('minAge is required'),
  genres: yup.array().of(yup.string().required()),
}).required()

export const GameItemModal: FC<GameItemModalType> = ({ open, onClose, handleSubmitGame, gameInfo}) => {
  const { handleSubmit, reset, control} = useForm({defaultValues: gameInfo ?? DEFAULT_GAME_VALUE, resolver: yupResolver(GameSchemaYup)})

  const onCancel = (): void => {
    reset()
    onClose()
  }

  return (
    <Modal
      aria-describedby="modal-modal-description"
      aria-labelledby="modal-modal-title"
      onClose={onCancel}
      open={open}
    >
      <Box sx={{
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        height: '80%',
        overflow: 'scroll',
      }}>
        <form 
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(async(data) => {
            onCancel()
            await handleSubmitGame(data)
          })}
          style={{display: 'flex', flexDirection: 'column', gap: 8}}
        >
          <FormInputText name='name' control={control} label="Name: " sx={{ mb: 2 }} />
          <FormInputText name='minPlayer' control={control} label="Min player: " sx={{ mb: 2 }} />
          <FormInputText name='maxPlayer' control={control} label="Max player: " sx={{ mb: 2 }} />
          <FormInputText name='description' control={control} label="description: " sx={{ mb: 2 }} />
          <FormInputText name='playDuration' control={control} label="playDuration: " sx={{ mb: 2 }} />
          <FormInputText name='minAge' control={control} label="minAge: " sx={{ mb: 2 }} />

          <SelectFormField control={control} />
          <Button onClick={onCancel}>Cancel</Button>

          <Button type="submit">Submit</Button>
        </form>
      </Box>
    </Modal>
  );
};
