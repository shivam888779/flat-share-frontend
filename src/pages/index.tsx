
import { Box, Button, Divider, Stack } from "@mui/material";
import { FilterNavbar, Footer, Header, UserDetailsCrad } from "../component";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";
import { useGlobalContext } from "@/global-context";

export default function Home() {
  const a = Array(10).fill(0);

  const { state } = useGlobalContext();
  console.log(state)
  return (
    <Box width={"100%"} mt={4}>

      <Box mx={"auto"} maxWidth={"1440px"}>
        <FilterNavbar />
        <Divider className="my-6" />
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} gap={3} flexWrap={"wrap"} >
          {a.map((data, index) => {
            return <div key={index}> <UserDetailsCrad /> </div>
          })}
        </Stack>
        <Button variant="contained" sx={{ borderRadius: 50, mx: "auto", display: "flex", my: 2 }}> <KeyboardDoubleArrowDown /> Load More</Button>
        {/* <UserDetailsCrad/> */}
        <Footer />

      </Box>
    </Box>
  );
}
