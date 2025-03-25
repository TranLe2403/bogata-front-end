import { FC } from 'react';
import { GameFormType, GameInputType } from '../types/GameType';
import { Box, Button, Modal } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
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

const schema: zod.ZodType<GameFormType> = zod.object({
  name: zod.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string"
  }).nonempty(),
  minPlayer: zod.number({
    required_error: "Min player is required",
    invalid_type_error: "Min player must be a number"
  }).positive().int(),
  maxPlayer: zod.number({
    invalid_type_error: "Max player must be a number"
  }).positive().int(),
  description: zod.string(),
  playDuration: zod.number({
    required_error: "Play duration is required",
    invalid_type_error: "Play duration must be a number"
  }).positive().int(),
  minAge: zod.number({
    required_error: "Min age is required",
    invalid_type_error: "Min age must be a number"
  }).positive().int(),
  genres: zod.string({
    required_error: "Something went wrong, please re-add the genres to try again",
  }).array()
})
.refine((data) => data.minPlayer < data.maxPlayer, {
  message: "Min players must be smaller than max player",
  path: ["minPlayer"],
})

export const GameItemModal: FC<GameItemModalType> = ({ open, onClose, handleSubmitGame, gameInfo}) => {
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm({defaultValues: gameInfo ?? DEFAULT_GAME_VALUE, resolver: zodResolver(schema)})

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
          <FormInputText register={register} name='name' error={errors.name} label="Name: " sx={{ mb: 2 }} />
          <FormInputText register={register} valueAsNumber name='minPlayer' error={errors.minPlayer} label="Min player: " sx={{ mb: 2 }} />
          <FormInputText register={register} valueAsNumber name='maxPlayer' error={errors.maxPlayer} label="Max player: " sx={{ mb: 2 }} />
          <FormInputText register={register} name='description' error={errors.description} label="description: " sx={{ mb: 2 }} />
          <FormInputText register={register} valueAsNumber name='playDuration' error={errors.playDuration} label="playDuration: " sx={{ mb: 2 }} />
          <FormInputText register={register} valueAsNumber name='minAge' error={errors.minAge} label="minAge: " sx={{ mb: 2 }} />

          <SelectFormField control={control} />
          <Button onClick={onCancel}>Cancel</Button>

          <Button type="submit">Submit</Button>
        </form>
      </Box>
    </Modal>
  );
};
