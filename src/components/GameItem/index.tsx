import { GameItemType } from '../../App';
import StarIcon from '@mui/icons-material/Star';
import styled from '@emotion/styled';

const GameItemContainer = styled.div`
  background: #ececec;
  padding: 16px 32px;
  display: flex;
  gap: 16px;
  border-radius: 4px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.08);
`;

const ImageStyle = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 4px;
`;

const NoMarginText = styled.p`
  margin: 0;
`;

const ItalicText = styled.p`
  font-style: italic;
  margin: 0;
`;

const NoMarginHeading = styled.h2`
  margin: 0;
`;

const GameInfoStyle = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
  flex-direction: column;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  height: fit-content;
  gap: 8px;
`;

const GameItem = ({ data }: { data: GameItemType }) => {
  return (
    <GameItemContainer>
      <ImageStyle
        data-testid="game-image"
        src={
          data.pictures !== undefined
            ? data.pictures[0]
            : 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png'
        }
      />
      <GameInfoStyle>
        <NoMarginHeading>{data.name}</NoMarginHeading>
        <ItalicText>
          {data.genre.map((item, i) => `${item}${i === data.genre.length - 1 ? '' : ', '}`)}
        </ItalicText>
        <NoMarginText>Date added: {data.dateAdded}</NoMarginText>
      </GameInfoStyle>
      <RatingContainer>
        <NoMarginText>BoardGameGeek rating: {data.rating}/10</NoMarginText>
        <StarIcon />
      </RatingContainer>
    </GameItemContainer>
  );
}

export default GameItem;
