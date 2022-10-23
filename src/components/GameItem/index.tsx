import { GameItemType } from '../../App';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles: any = makeStyles(() => ({
  card: { display: 'flex', width: '100%', background: '#ECECEC' },
  media: { height: 160, width: 160 }
}));

const DEFAULT_IMG =
  'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png';

const GameItem = ({ data }: { data: GameItemType }) => {
  const classes = useStyles();
  const getImageSrc = () => (data.pictures === undefined ? DEFAULT_IMG : data.pictures[0]);

  return (
    <Card classes={{ root: classes.card }}>
      <CardMedia
        data-testid="game-image"
        classes={{ root: classes.media }}
        image={getImageSrc()}
        title={data.name}
      />
      <CardContent sx={{ flex: 1 }} data-testid="game-content">
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontWeight: 'bold' }} gutterBottom variant="h5" component="h2">
            {data.name}
          </Typography>
          <Typography data-testid="game-rating" component="p">
            BoardGameGeek rating: {data.rating}/10
          </Typography>
        </Box>
        <Typography sx={{ fontStyle: 'italic' }} component="p">
          {data.genre.map((item, i) => `${item}${i === data.genre.length - 1 ? '' : ', '}`)}
        </Typography>
        <Typography data-testid="game-date-added" component="p">
          Date added: {data.dateAdded}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GameItem;
