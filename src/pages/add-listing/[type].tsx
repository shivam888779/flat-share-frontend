import { ListPropertyForm } from "@/component";
import { Box } from "@mui/material";
import { useRouter } from "next/router";

const ListProperty = () => {

    const router = useRouter()
    const { type } = router.query

    return <Box sx={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
        <ListPropertyForm type={String(type)} isEdit={false} />
    </Box>
}

export default ListProperty;