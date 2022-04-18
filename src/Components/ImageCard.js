import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function ImageCard({ imgHeight, cardData }) {
  const { title, subtitle, image, link } = cardData;
  return (
    <Card sx={{ maxWidth: 240, borderRadius: 3, marginRight: 1 }}>
      <Link to={link || '#'} >
        <CardMedia
          component="img"
          height={imgHeight || '180'}
          image={`https://image.tmdb.org/t/p/w500${image}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" textAlign='center'>
            {title || ''}
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign='center'>
            {subtitle || ''}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
}

export default ImageCard;