import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';

interface Props {
  handleDialogOpen: () => void;
  title: string;
  description?: string;
  image: string;
  route: string;
  icon: React.ReactNode;
  gradient: string;
}
const SelectListingCard = ({ title, description, icon, handleDialogOpen, route, gradient }: Props) => {
  const router = useRouter();

  return (
    <Card
      sx={{
        height: '100%',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '2px solid',
        borderColor: 'grey.200',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-8px)',
          borderColor: 'primary.main',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          '& .icon-box': {
            background: gradient,
            color: 'white',
            transform: 'scale(1.1)',
          },
          '& .color-bar': {
            transform: 'scaleX(1)',
          }
        },
        '&:active': {
          transform: 'translateY(-4px)',
        }
      }}
    >
      {/* Animated color bar */}
      <Box
        className="color-bar"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: gradient,
          transform: 'scaleX(0)',
          transition: 'transform 0.3s ease',
          transformOrigin: 'left',
        }}
      />

      <CardActionArea
        onClick={() => router.push(route).then(() => handleDialogOpen())}
        sx={{
          height: '100%',
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          className="icon-box"
          sx={{
            width: 80,
            height: 80,
            borderRadius: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey.100',
            mb: 3,
            transition: 'all 0.3s ease',
            color: 'text.secondary',
          }}
        >
          {icon}
        </Box>

        <Typography
          variant="h5"
          component="h3"
          fontWeight={600}
          color="text.primary"
          mb={1.5}
          textAlign="center"
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          lineHeight={1.7}
        >
          {description}
        </Typography>
      </CardActionArea>
    </Card>
  );
};
export default SelectListingCard;