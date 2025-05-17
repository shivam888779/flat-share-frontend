import { LogInForm } from "@/component";
import { useGlobalContext } from "@/global-context"
import { Box, Stack } from "@mui/material";
import Image from "next/image";


const LogIn = () => {

  const { state, setState } = useGlobalContext()

  return <Stack direction={"row"}>
    <div style={{ position: 'relative', width: '50vw', height: '100vh' }}>
      <Image
        alt="log-dashboard"
        src="/images/login/login-dashbord.png"
        fill
        style={{ objectFit: 'cover' }}
      />
    </div>
    <LogInForm />

  </Stack>


}
export default LogIn;