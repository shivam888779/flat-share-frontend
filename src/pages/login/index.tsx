import { LogInForm } from "@/component";
import { useGlobalContext } from "@/global-context"
import { Box, Grid, Stack } from "@mui/material";
import Image from "next/image";


const LogIn = () => {

  const { state, setState } = useGlobalContext()

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          position: 'relative',
        }}
      >
        <Image
          alt="log-dashboard"
          src="/images/login/login-dashbord.png"
          fill
          style={{ objectFit: 'cover' }}
        />
      </Grid>
      <Grid item xs={12} sm={8} md={5}>
        <LogInForm />
      </Grid>
    </Grid>
  );


}
export default LogIn;