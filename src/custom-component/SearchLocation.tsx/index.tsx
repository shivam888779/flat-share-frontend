import React, { useState, useRef, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { ILocation } from "@/types/property";

const libraries: ("places")[] = ["places"];
const GOOGLE_MAPS_API_KEY = "AIzaSyBkEMXezDZpWUD6XuDFLf07bao3kJq4f_Q"; 

interface Props {
  setLocation : any
}

export default function LocationSearch(props:Props) {
  const {setLocation} = props;
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
  const [input, setInput] = useState("");

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
            latitude:lat,
            longitude :lng,
            address : address
          })
          setInput(address); 
        }
      });

      inputRef.current.dataset.autocompleteInitialized = "true";
    }
  }, [isLoaded]);


  return isLoaded ? (
    <div>
      <input
        ref={inputRef}
        type="text"
        className="search-input"
        placeholder="Enter a location"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    
    </div>
  ) : (
    <p>Loading...</p>
  );
}
