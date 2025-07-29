import React, { useState, useRef, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { useRouter } from 'next/router';
import { TextField, InputAdornment } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useGlobalContext } from "@/global-context";

const libraries: ("places")[] = ["places"];
const GOOGLE_MAPS_API_KEY = "AIzaSyBkEMXezDZpWUD6XuDFLf07bao3kJq4f_Q";

interface Props {
  setLocation: any;
}

export default function LocationSearch(props: Props) {
  const { setLocation } = props;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<{
    name: string;
    address: string;
    lat?: number;
    lng?: number;
  } | null>(null);
  const router = useRouter();
  const { state: { myProperty } } = useGlobalContext();
  console.log(myProperty);

  const isMyPropertyPage = router.pathname.includes("/my-property");

  const [input, setInput] = useState(isMyPropertyPage ? myProperty?.location?.address as string : router.query.location as string || "");

  useEffect(() => {
    if (isLoaded && inputRef.current && !inputRef.current.dataset.autocompleteInitialized) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: "in" },
        fields: ["place_id", "geometry", "name", "formatted_address"],
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place && place.geometry) {
          const lat = place.geometry.location?.lat();
          const lng = place.geometry.location?.lng();
          const name = place.name || "";
          const address = place.formatted_address || "";

          setSelectedPlace({ name, address, lat, lng });
          setLocation({
            latitude: lat,
            longitude: lng,
            address: address
          });
          setInput(address);
        }
      });

      inputRef.current.dataset.autocompleteInitialized = "true";
    }
  }, [isLoaded, setLocation]);

  return isLoaded ? (
    <TextField
      inputRef={inputRef}
      type="text"
      placeholder="Enter a location"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      fullWidth
      variant="outlined"
      size="small"
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          '& fieldset': {
            borderColor: '#e5e7eb',
          },
          '&:hover fieldset': {
            borderColor: '#9ca3af',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'primary.main',
            borderWidth: '1px',
          },
        },
        '& .MuiInputBase-input': {
          padding: '10px 14px',
          fontSize: '0.875rem',
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LocationOnIcon sx={{ color: '#6b7280', fontSize: '1.25rem' }} />
          </InputAdornment>
        ),
      }}
    />
  ) : (
    <TextField
      disabled
      fullWidth
      variant="outlined"
      size="small"
      placeholder="Loading..."
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#f9fafb',
        },
      }}
    />
  );
}