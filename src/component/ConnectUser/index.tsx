import { Call, Chat, Man } from "@mui/icons-material";
import { Card, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { IPropertyUser } from "@/types/property";

interface IConnectUserProps {
    propertyUser: IPropertyUser;
}

const ConnectUser = (props:IConnectUserProps) => {
    const {propertyUser} = props;
    const {firstName,lastName,gender,profileImage} = propertyUser;

    return <Card className="mx-auto max-w-60 flex flex-col justify-center items-center py-6" >
        <Image src={profileImage}
            width={125}
            height={125}
            alt="Picture of the author"
            className="mx-auto rounded-full w-32 h-32"
        />
        <Typography variant="h5" mt={2}>Connect to</Typography>
        <Typography variant="subtitle1" >{firstName+" "+lastName}</Typography>
        <Typography variant="subtitle2" mb={3}>(<Man/>{gender} )</Typography>
        <Stack direction={"row"} gap={4} >
            <IconButton className=" rounded-2xl items-center p-2">
            <Call  />
            <Typography variant="h5" > Call</Typography>
            </IconButton>
            <IconButton className=" rounded-2xl items-center p-2">
            <Chat />
            <Typography variant="h5" > Chat</Typography>
            </IconButton>
        </Stack>

    </Card>

}

export default ConnectUser;