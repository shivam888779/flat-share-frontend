import { Box, Button, Divider, Stack } from "@mui/material";
import { FilterNavbar, Footer, Header, PropertyDetailsCard } from "../component";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";
import { useGlobalContext } from "@/global-context";
import { useEffect, useState } from "react";
import { SearchPropertyCard } from "@/types/property";
import { searchPropertiesApi } from "./property/apis";
import { useRouter } from 'next/router';

export default function Home() {
  const a = Array(10).fill(0);

  const { state } = useGlobalContext();
  console.log(state)
  const [location, setLocation] = useState<any>([]);
  const [propertyList, setPropetyList] = useState<Array<SearchPropertyCard>>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Restore location from query params on mount
  useEffect(() => {
    if (router.query.lat && router.query.lng) {
      setLocation({
        latitude: parseFloat(router.query.lat as string),
        longitude: parseFloat(router.query.lng as string),
      });
    }
  }, [router.query.lat, router.query.lng]);

  // Update query params when location changes
  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      router.replace({
        pathname: router.pathname,
        query: {
          ...router.query,
          lat: location.latitude,
          lng: location.longitude,
        },
      }, undefined, { shallow: true });
    }
  }, [location]);

  useEffect(() => {
    const fetchProperties = async () => {
      if (!location?.longitude || !location?.latitude) return;
      setLoading(true);
      try {
        const payLoad = {
          lng: location?.longitude,
          lat: location?.latitude,
          radiusKm: 5000
        };
        const response = await searchPropertiesApi(payLoad);
        setPropetyList(response?.data?.data);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [location, setLocation]);

  return (
    <Box width={"100%"} mt={4}>
      <Box mx={"auto"} maxWidth={"1440px"}>
        <FilterNavbar setLocation={setLocation} />
        <Divider className="my-6" />
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} gap={3} flexWrap={"wrap"} >
            {propertyList.map((data, index) => {
            return <div key={index}> <PropertyDetailsCard propertyDetails={data} /> </div>
          })}
        </Stack>
        <Button variant="contained" sx={{ borderRadius: 50, mx: "auto", display: "flex", my: 2 }}> <KeyboardDoubleArrowDown /> Load More</Button>
        {/* <UserDetailsCrad/> */}
        <Footer />
        {loading && <div>Loading properties...</div>}
      </Box>
    </Box>
  );
}
