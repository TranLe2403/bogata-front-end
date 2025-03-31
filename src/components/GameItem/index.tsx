import { GameItemType } from '../../App';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DEFAULT_IMG } from '../../utils';
import { FC } from 'react';

const useStyles: any = makeStyles(() => ({
  card: { display: 'flex', width: '100%', background: '#ECECEC' },
  media: { height: 160, width: 160 }
}));

const GameItem: FC<{ data: GameItemType }> = ({ data }) => {
  const classes = useStyles();
  const getImageSrc = (): string => (data.pictures != null) ? data.pictures[0] : DEFAULT_IMG;

  return (
    <Card classes={{ root: classes.card }}>
      <CardMedia
        classes={{ root: classes.media }}
        data-testid="game-image"
        image={getImageSrc()}
        title={data.name}
      />
      <CardContent data-testid="game-content" sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography component="h2" gutterBottom sx={{ fontWeight: 'bold' }} variant="h5">
            {data.name}
          </Typography>
          <Typography component="p" data-testid="game-rating">
            BoardGameGeek rating: {data.rating}/10
          </Typography>
        </Box>
        <Typography component="p" sx={{ fontStyle: 'italic' }}>
          {data.genre.map((item, i) => `${item}${i === data.genre.length - 1 ? '' : ', '}`)}
        </Typography>
        <Typography component="p" data-testid="game-date-added">
          Date added: {data.dateAdded}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GameItem;
