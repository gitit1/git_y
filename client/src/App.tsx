import { Typography, Container, Box } from '@mui/material';
import './App.scss';
import ShareImage from 'components/ShareImage';
import CheckServerConnection from 'components/CheckServerConnection';

const App: React.FC = () => {
  return (
    <Container className='wrapper'>
      <Box component="header">
        <Typography variant="h1" className="title">Y</Typography>
        <Typography variant="h4" className="title">Upload Your Images and Share Them!</Typography>
      </Box>
      <Box component="main"><ShareImage /></Box>
      <Box component="footer">
        <CheckServerConnection />
      </Box>
    </Container>
  );
};

export default App;