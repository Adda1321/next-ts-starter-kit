import {Box, Button, Typography} from '@mui/material';
import Link from 'next/link';

interface Prop {
  resource?: string;
  customMessage?: string;
  returnPath?: string;
}

interface NotFoundResourceProps {
  resource?: string;
  customMessage?: string;
  returnPath?: string;
}

const NotFoundResource = ({
  resource = 'Resource',
  customMessage,
  returnPath = '/'
}: NotFoundResourceProps) => {
  const defaultMessage = `We’re sorry, but the ${resource.toLowerCase()} you are looking for could not be found.`;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 500,
          width: '100%',
          textAlign: 'center',
          p: 4,
          boxShadow: 3,
          backgroundColor: 'background.paper',
        }}
        className="rounded-lg!"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Invalid {resource} ID
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {customMessage || defaultMessage}
        </Typography>
        <Button
          component={Link}
          href={returnPath}
          variant="contained"
          color="primary"
          aria-label="Return to homepage"
          sx={{mt: 2}}
        >
          Return Home
        </Button>
      </Box>
    </Box>
  );
};

export default NotFoundResource;
