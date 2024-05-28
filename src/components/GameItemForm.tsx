import { Dispatch, FC, FormEvent, SetStateAction } from 'react';
import { genre } from './FilterBox';
import FilterSelect from './FilterSelect';
import { GameInputType } from '../types/GameType';
import { Box, Modal } from '@mui/material';

interface GameItemModalType {
  setGameInput:  Dispatch<SetStateAction<GameInputType>>
  gameInput: GameInputType
  handleSubmitGame:(event: FormEvent<HTMLFormElement>) => void
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const GameItemModal: FC<GameItemModalType> = ({ open, setOpen, handleSubmitGame, setGameInput, gameInput}) => {
  const handleNameChange = (event: FormEvent<HTMLInputElement>): void => {
    setGameInput({...gameInput, [event.currentTarget.id]:event.currentTarget.value})
  }

  return (
    <Modal
      aria-describedby="modal-modal-description"
      aria-labelledby="modal-modal-title"
      onClose={() => setOpen(false)}
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
      }}>
        <form onSubmit={handleSubmitGame} style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          <label htmlFor="name">
          Name:
            <input id="name" onChange={handleNameChange} type="text" value={gameInput.name} />
          </label>

          <label htmlFor="minPlayer">
          Min Players:
            <input id="minPlayer" onChange={handleNameChange} type="number" value={gameInput.minPlayer} />
          </label>
          <label htmlFor="maxPlayer">
          Max Players:
            <input id="maxPlayer" onChange={handleNameChange} type="number" value={gameInput.maxPlayer} />
          </label>
          <label htmlFor="description">
          Description:
            <input id="description" onChange={handleNameChange} type="text" value={gameInput.description} />
          </label>
          <label htmlFor="playDuration">
          Play Duration:
            <input id="playDuration" onChange={handleNameChange} type="number" value={gameInput.playDuration} />
          </label>
          <label htmlFor="minAge">
          Min Age:
            <input id="minAge" onChange={handleNameChange} type="number" value={gameInput.minAge} />
          </label>


          <FilterSelect
            data={genre}
            gameInput={gameInput}
            setGameInput={setGameInput}
            title="Genres"
          />

          <input type="submit" value="Submit"  />
        </form>
      </Box>
    </Modal>
  );
};
