import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useRouter } from 'next/router';

interface Props {
  handleDialogOpen: () => void;
  title: string;
  description?: string;
  image: string;
  route: string;
}

const SelectListingCard = (props: Props) => {

  const router = useRouter()

  const { handleDialogOpen, title, route, description, image } = props;

  return <Card sx={{ maxWidth: 345 }}>
    <CardActionArea onClick={() => router.push(route)} >
      <CardMedia
        component="img"
        height="140"
        image={image || "/static/images/cards/contemplative-reptile.jpg"}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
}
export default SelectListingCard;