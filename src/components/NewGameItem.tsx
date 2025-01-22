import { Dispatch, FC, SetStateAction, useState} from 'react';
import axios from 'axios';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { GameItemModal } from './GameItemForm';
import { GameItem } from '../types/GameType';
import { FieldValues } from 'react-hook-form';
import { getFullGameInfo } from '../utils/getFullGameInfo';
import placeholder from '../bogata-placeholder.jpeg'

export const NewGameItem: FC<{item: GameItem, gameItems: GameItem[], setGameItems: Dispatch<SetStateAction<GameItem[]>>}> = ({item, gameItems, setGameItems}) => {
  const [open, setOpen] = useState(false)

  const handleDelete = (): void => {
    axios.delete(`http://localhost:3005/api/games/${item.id}`).catch(err => console.error(err))
    const newGameSet = gameItems.filter((game) => game.id !== item.id)
    setGameItems(newGameSet)
  }

  const openEditModal = (): void => {
    setOpen(true)
  }

  const handleSubmitEdit = async (data: FieldValues ): Promise<void> => {
    const fullGame = getFullGameInfo(data)
    try {
      await axios.put(`http://localhost:3005/api/games/${item.id}`, fullGame)
    } catch (error) {
      console.log('error: ', error)
    }
    const copyGameItems = [...gameItems]
    const itemIndex = copyGameItems.findIndex((game)=>game.id===item.id)
    copyGameItems[itemIndex] = {id: item.id, ...fullGame }
    setGameItems(copyGameItems)
    setOpen(false)
  }

  return (
    <>
      <Card key={item.id} sx={{ margin: '24px', display: 'flex' }}>
        <CardMedia 
          src={placeholder}
          component="img"
          sx={{ width: 200 }}
        />
        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="div" gutterBottom variant="h4">
              {item.name}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {item.genres.join(', ')}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Date added: {item.dateAdded}
            </Typography>
          </CardContent>
          <CardActions sx={{marginLeft: 'auto'}}>
            <Button onClick={openEditModal} size="small">Edit</Button>
            <Button onClick={handleDelete} size="small">Delete</Button>
          </CardActions>
        </Box>
      </Card>
      <GameItemModal gameInfo={item} handleSubmitGame={handleSubmitEdit} open={open} onClose={() => setOpen(false)} />
    </>
  );
};
