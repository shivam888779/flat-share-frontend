import { Box, Stack, Typography } from "@mui/material"
import Image from "next/image";
import { PersonPinCircleOutlined, CallOutlined, ChatOutlined } from "@mui/icons-material";
import Link from "next/link";
import { useState } from 'react';
import { SearchPropertyCard } from "@/types/property";
import RequestContact from "../contact-access-components/RequestContact";
import { requestConnectionApi } from "@/api/connections";

const PropertyDetailsCard = (props: {propertyDetails:SearchPropertyCard}) => {
  const {
    userImage,
    userName,
    address,
    rent,
    partnerGender,
    distance,
    slug,
    userId
  } = props.propertyDetails;

  const [isRequestContactOpen, setIsRequestContactOpen] = useState(false);
  
  const handleCloseRequestContact = () => {
    setIsRequestContactOpen(false);
  };

  const handleOpenRequestContact = () => {
    setIsRequestContactOpen(true);
  };


  return <>
 <Box maxWidth={430} minWidth={425} minHeight={180} boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"}>
   <Link href={`/property/${slug}`}>
      <Stack direction={"row"}  >

          <Image
            src={userImage}
            width={125}
            height={125}
            alt={`Picture of ${userName}`}
          />
          <Box width={"100%"} m={2}>
              <Typography variant="h4" >{userName}</Typography>
              <Typography className="max-w-64 truncate" variant="subtitle2" my={0.5}><PersonPinCircleOutlined sx={{ height: 18, width: 18, mb: 0.5 }} />&nbsp;{address}</Typography>

              <Stack direction={"row"} justifyContent={"space-between"} mt={2}>
                  <Box>
                      <Typography variant="subtitle2">Rent</Typography>
                      <Typography variant="h5">{rent}</Typography>
                  </Box>
                  <Box>
                      <Typography variant="subtitle2">Looking For</Typography>
                      <Typography variant="h5">{partnerGender}</Typography>
                  </Box>
                  <Box>
                      <Typography variant="subtitle2">Need A</Typography>
                      <Typography variant="h5">RoomMate</Typography>
                  </Box>
              </Stack>
          </Box>

      </Stack>
    </Link>
      <hr />
      <Stack direction={"row"} justifyContent={"space-between"} m={1}>
          <Typography variant="subtitle2"><b>{distance} km</b> far from you</Typography>
          <Typography variant="subtitle2"> connect by <ChatOutlined sx={{ width: 18, height: 18,mx:1 }} /> <CallOutlined onClick={()=>setIsRequestContactOpen(true)} sx={{ width: 18, height: 18 }} /></Typography>
      </Stack>
   
  </Box>

  <RequestContact 
        onClose={handleCloseRequestContact} 
        open={isRequestContactOpen} 
        userId={userId}
      />
  </>
}

export default PropertyDetailsCard;