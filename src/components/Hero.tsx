import { Box, Container, Typography, Button, Stack } from '@mui/material';

const Hero = () => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 8,
        pb: 6,
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="column"
          spacing={4}
          alignItems="center"
          textAlign="center"
        >
          <Typography
            component="h1"
            variant="h2"
            color="text.primary"
            fontWeight="bold"
            gutterBottom
          >
            Apprenez à coder de façon amusante
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            paragraph
            sx={{ maxWidth: 'sm', mx: 'auto' }}
          >
            Découvrez le monde passionnant de la programmation à travers des exercices interactifs et des projets créatifs adaptés aux enfants.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" size="large" color="primary">
              Commencer
            </Button>
            <Button variant="outlined" size="large">
              En savoir plus
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Hero;