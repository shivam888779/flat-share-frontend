'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  TextField,
  Chip,
  InputAdornment,
  Box,
  Typography,
  Container,
  useTheme,
  alpha
} from '@mui/material'
import { Search } from '@mui/icons-material'
import { useLoadScript } from "@react-google-maps/api";
import router from 'next/router';
import { ILocationData, IPopularTopic } from '@/types/user';

const libraries: ("places")[] = ["places"];
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyBkEMXezDZpWUD6XuDFLf07bao3kJq4f_Q";

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const [isNight, setIsNight] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<ILocationData | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const popularTopics = [
    {
      name: 'Noida',
      slug: '/listing?location=Noida%2C+Uttar+Pradesh%2C+India&lat=28.5355161&lng=77.3910265'
    }
    , {
      name: 'Delhi',
      slug: '/listing?location=Delhi%2C+India&lat=28.7040592&lng=77.10249019999999'
    },
    {
      name: 'Gurgaon',
      slug: '/listing?location=Gurgaon%2C+Haryana%2C+India&lat=28.4594965&lng=77.0266383'
    },
    {
      name: 'Bengaluru',
      slug: '/listing?location=Bengaluru%2C+Karnataka%2C+India&lat=12.9716&lng=77.5946'
    },
    {
      name: 'Mumbai',
      slug: '/listing?location=Mumbai%2C+Maharashtra%2C+India&lat=19.0759837&lng=72.8776559'
    },
    {
      name: 'Chennai',
      slug: '/listing?location=Chennai%2C+Tamil+Nadu%2C+India&lat=13.0826802&lng=80.2707184'
    },
    {
      name: 'Hyderabad',
      slug: '/listing?location=Hyderabad%2C+Telangana%2C+India&lat=17.385044&lng=78.486671'
    },
    {
      name: 'Kolkata',
      slug: '/listing?location=Kolkata%2C+West+Bengal%2C+India&lat=22.5726459&lng=88.3638922'
    },
    {
      name: 'Jaipur',
      slug: '/listing?location=Jaipur%2C+Rajasthan%2C+India&lat=26.9124336&lng=75.7872709'
    },
    {
      name: 'Ahmedabad',
      slug: '/listing?location=Ahmedabad%2C+Gujarat%2C+India&lat=23.022505&lng=72.5713621'
    },
  ]

  const handleLogoClick = () => {
    setIsNight(!isNight)
  }

  // Initialize Google Places Autocomplete
  useEffect(() => {
    let autocomplete: any;
    if (isLoaded && inputRef.current && !inputRef.current.dataset.autocompleteInitialized) {
      autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
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

          setSelectedLocation({ name, address, lat, lng });
          setSearchInput(address);

          // You can handle the location data here
          console.log("Selected location: 123", { name, address, lat, lng });
          router.push(`/listing?location=${address}&lat=${lat}&lng=${lng}`)
        }
      });

      inputRef.current.dataset.autocompleteInitialized = "true";
    }
    return () => {
      if (autocomplete) {
        window.google.maps.event.clearInstanceListeners(autocomplete);
      }
    }
  }, [isLoaded]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = () => {
    // Handle search submission here
    console.log("Search submitted:", searchInput);
    if (selectedLocation) {
      console.log("Location data:", selectedLocation);
    }
  };

  return (
    <Box
      sx={{
        overflowX: 'hidden',
        transition: 'colors 0.3s ease',
        backgroundColor: isNight ? theme.palette.grey[900] : theme.palette.grey[50]
      }}
    >
      {/* Header */}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          pt: { xs: theme.spacing(6), md: theme.spacing(12) },
          px: { xs: theme.spacing(2), sm: theme.spacing(3), lg: theme.spacing(4) },
          maxWidth: '80rem',
          mx: 'auto',
          textAlign: 'center'
        }}
      >
        <Box
          sx={{
            display: { xs: 'none', md: 'inline-block' },
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.common.white,
            px: theme.spacing(3),
            py: theme.spacing(1),
            borderRadius: '9999px',
            fontSize: '0.875rem',
            mb: theme.spacing(4),
            animation: 'pulse 2s infinite'
          }}
        >
          Trusted & loved by 10,000+ flatmates
        </Box>

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.25rem', sm: '3rem', lg: '3.75rem' },
            fontWeight: 'bold',
            color: theme.palette.grey[800],
            mb: theme.spacing(2),
            animation: 'fadeInUp 0.6s ease-out',
            display: { xs: 'none', md: 'block' }
          }}
        >
          Find your perfect flatmate<br />& Shared Living Space
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontSize: '1.25rem',
            color: theme.palette.grey[600],
            mb: theme.spacing(6),
            animation: 'fadeInUp 0.6s ease-out',
            animationDelay: '200ms',
            animationFillMode: 'both'
          }}
        >
          Discover compatible roommates and affordable shared accommodations
        </Typography>

        {/* Search Box */}
        <Box
          sx={{
            maxWidth: '32rem',
            mx: 'auto',
            mb: theme.spacing(4),
            animation: 'fadeInUp 0.6s ease-out',
            animationDelay: '400ms',
            animationFillMode: 'both'
          }}
        >
          {isLoaded ? (
            <TextField
              fullWidth
              placeholder="Search for flats, roommates, or location..."
              variant="outlined"
              value={searchInput}
              onChange={handleSearchChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit();
                }
              }}
              inputRef={inputRef}
              sx={{
                backgroundColor: theme.palette.common.white,
                borderRadius: '9999px',
              }}
              InputProps={{
                sx: {
                  '& fieldset': {
                    border: 'none',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                    borderRadius: '9999px',
                  },
                  '&:hover fieldset': {
                    boxShadow: '0 15px 50px rgba(0,0,0,0.12)'
                  },
                  '&.Mui-focused': {
                    transform: 'translateY(-2px)',
                    '& fieldset': {
                      boxShadow: '0 15px 50px rgba(0,0,0,0.12)'
                    }
                  },
                  transition: 'all 0.3s ease',
                  padding: '0 0.25rem'
                }
              }}
            />
          ) : (
            <TextField
              fullWidth
              placeholder="Loading search functionality..."
              variant="outlined"
              disabled
              sx={{
                backgroundColor: theme.palette.common.white,
                borderRadius: '9999px'
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: theme.palette.grey[400] }} />
                  </InputAdornment>
                ),
                sx: {
                  '& fieldset': {
                    border: 'none',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                  }
                }
              }}
            />
          )}
        </Box>

        {/* Popular Areas */}
        <Box
          position="relative"
          zIndex={10}
          sx={{
            mb: theme.spacing(6),
            animation: 'fadeInUp 0.6s ease-out',
            animationDelay: '600ms',
            animationFillMode: 'both'
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.875rem',
              color: theme.palette.grey[600],
              mb: theme.spacing(1.5)
            }}
          >
            Popular Areas
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: theme.spacing(1.5)
            }}
          >
            {popularTopics.map((topic: IPopularTopic) => (
              <Chip
                key={topic.name}
                label={topic.name}
                clickable
                sx={{
                  backgroundColor: theme.palette.common.white,
                  color: theme.palette.primary.main,
                  fontSize: '0.9rem',
                  padding: '0.5rem',
                  transform: 'translateY(0)',
                  borderRadius: '9999px',
                  transition: 'all 0.3s ease',
                  boxShadow: theme.shadows[1],
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.common.white,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 5px 20px ${alpha(theme.palette.primary.main, 0.3)}`
                  }
                }}
                onClick={() => {
                  router.push(topic.slug)
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Illustration Container */}

      </Box>
    </Box>
  )
}

export default LandingPage