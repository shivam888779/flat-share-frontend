import { LogInForm } from "@/component";
import { Box, Container, Grid, useTheme } from "@mui/material";

const LogIn = () => {

  return (
    <Box
      className="gradient-background"
    >
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="93vh"
          // py={4}
          position="relative"
          zIndex={1}
        >

          <LogInForm />
        </Box>
      </Container >
    </Box >

  );
};

export default LogIn;