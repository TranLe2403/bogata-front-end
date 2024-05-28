import { Dispatch, FC, FormEvent, SetStateAction, useState} from 'react';
import axios from 'axios';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { GameItemModal } from './GameItemForm';
import { GameInputType, GameItem } from '../types/GameType';

export const NewGameItem: FC<{item: GameItem, gameItems: GameItem[], setGameItems: Dispatch<SetStateAction<GameItem[]>>}> = ({item, gameItems, setGameItems}) => {
  const [open, setOpen] = useState(false)
  const [updatedGameInput, setUpdatedGameInput] = useState<GameInputType>({
    name: item.name,
    genres: item.genres,
    description: item.description,
    minPlayer: item.minPlayer,
    maxPlayer: item.maxPlayer,
    playDuration: item.playDuration,
    available: item.available,
    pictures: item.pictures,
    size: item.size,
    minAge: item.minAge,
    condition: item.condition,
  
  })

  const handleDelete = (): void => {
    axios.delete(`http://localhost:3005/api/games/${item.id}`).catch(err => console.error(err))
    const newGameSet = gameItems.filter((game) => game.id !== item.id)
    setGameItems(newGameSet)
  }

  const openEditModal = (): void => {
    setOpen(true)
  }

  const handleSubmitEdit = (event: FormEvent<HTMLFormElement> ):  void => {
    event.preventDefault()
    axios.put(`http://localhost:3005/api/games/${item.id}`, updatedGameInput).then(res => {
    }).catch(err => console.log(err))
    const copyGameItems = [...gameItems]
    const itemIndex = copyGameItems.findIndex((game)=>game.id===item.id)
    copyGameItems[itemIndex] = {id: item.id, ...updatedGameInput }
    setGameItems(copyGameItems)
    setOpen(false)
  }

  return (
    <>
      <Card key={item.id} sx={{ maxWidth: 345 }}>
        {/* would replace with actual image */}
        <CardMedia
          image="/static/images/cards/contemplative-reptile.jpg"
          sx={{ height: 140 }}
          title="green iguana"
        />
        <CardContent>
          <Typography component="div" gutterBottom variant="h5">
            {item.name}
          </Typography>
          {/* description */}
          <Typography color="text.secondary" variant="body2">
            {item.genres}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={openEditModal} size="small">Edit</Button>
          <Button onClick={handleDelete} size="small">Delete</Button>
        </CardActions>
      </Card>
      <GameItemModal gameInput={updatedGameInput} handleSubmitGame={handleSubmitEdit} open={open} setGameInput={setUpdatedGameInput} setOpen={setOpen} />
    </>
  );
};
