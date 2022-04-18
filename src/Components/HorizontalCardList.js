import { ImageList } from "@mui/material";
import ImageCard from "./ImageCard";

function HorizontalCardList(props) {
  const { items, cardWidth } = props;
  return (
    <ImageList
      sx={{
        gridAutoFlow: "column",
        gridTemplateColumns: `repeat(auto-fit, minmax(${cardWidth || 160}px, 1fr)) !important`,
        gridAutoColumns: `minmax(${cardWidth || 160}px, 1fr)`
      }}
    >
      {items.map(item =>
        <ImageCard
          imgHeight={props.imgHight}
          key={item.id} cardData={item} />
      )}
    </ImageList>
  );
}

export default HorizontalCardList;