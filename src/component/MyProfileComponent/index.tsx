import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import SubscriptionDetailCard from "../SubscriptionDetailCard";
import { useGlobalContext } from "@/global-context";

const MyProfileComponent = () => {
  const { state, setState } = useGlobalContext();
  const [isEditMode, setIsEditMode] = useState(false);

  const [profileData, setProfileData] = useState(state?.userData);
  console.log(state, profileData);

  useEffect(() => {
    setProfileData(state?.userData);
  }, [state]);

  // In a real application, you would fetch this data
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch('/api/user/4'); // Example endpoint
  //       const data = await response.json();
  //       setProfileData(data);
  //     } catch (error) {
  //       console.error("Failed to fetch user data:", error);
  //     }
  //   };
  //   fetchUserData();
  // }, []);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // Here you would typically send the updated data to your backend
    // For example:
    // try {
    //   const response = await fetch('/api/user/4', {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(profileData),
    //   });
    //   if (!response.ok) throw new Error('Failed to save profile data');
    //   const updatedData = await response.json();
    //   setProfileData(updatedData);
    //   setIsEditMode(false);
    // } catch (error) {
    //   console.error("Failed to save profile data:", error);
    // }
    console.log("Saved data:", profileData);
    setIsEditMode(false); // Exit edit mode after saving
  };

  return (
    <Box className="shadow-md rounded-lg p-8 my-16 mx-auto w-[55%]">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h3">My Profile</Typography>
        {!isEditMode && (
          <Button variant="outlined" onClick={() => setIsEditMode(true)}>
            Edit Profile
          </Button>
        )}
      </Stack>
      <hr className="my-6" />
      <Stack direction={"row"} gap={6} className="justify-between flex-wrap">
        <Box>
          <Typography variant="subtitle2" mb={0.5} ml={0.25}>
            First Name
          </Typography>
          <TextField
            name="firstName"
            value={profileData.firstName}
            onChange={handleChange}
            disabled={!isEditMode}
            placeholder="First Name..."
          />
        </Box>
        <Box>
          <Typography variant="subtitle2" mb={0.5} ml={0.25}>
            Last Name
          </Typography>
          <TextField
            name="lastName"
            value={profileData.lastName}
            onChange={handleChange}
            disabled={!isEditMode}
            placeholder="Last Name..."
          />
        </Box>
        <Box>
          <Typography variant="subtitle2" mb={0.5} ml={0.25}>
            Phone Number
          </Typography>
          <TextField
            name="phoneNo"
            value={profileData.phoneNo}
            onChange={handleChange}
            disabled={!isEditMode}
            placeholder="Phone Number..."
          />
        </Box>
        <Box>
          <Typography variant="subtitle2" mb={0.5} ml={0.25}>
            Email
          </Typography>
          <TextField
            name="email"
            value={profileData.email || ""}
            onChange={handleChange}
            disabled={!isEditMode}
            placeholder="Email..."
          />
        </Box>
        <Box>
          <Typography variant="subtitle2" mb={0.5} ml={0.25}>
            Gender
          </Typography>
          <Select
            name="gender"
            className="min-w-[200px] rounded-xl text-xl"
            value={profileData.gender}
            onChange={handleChange}
            disabled={!isEditMode}
          >
            <MenuItem className="text-xl" value={"Male"}>
              Male
            </MenuItem>
            <MenuItem className="text-xl" value={"Female"}>
              Female
            </MenuItem>
            <MenuItem className="text-xl" value={"Other"}>
              Other
            </MenuItem>
          </Select>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography variant="subtitle2" mb={0.5} ml={0.25}>
            Description
          </Typography>
          <TextField
            name="description"
            fullWidth
            multiline
            rows={4}
            value={profileData.description || ""}
            onChange={handleChange}
            disabled={!isEditMode}
            placeholder="Description..."
          />
        </Box>
      </Stack>
      {isEditMode && (
        <Button
          type="submit"
          variant="contained"
          className="mt-6"
          onClick={handleSave}
        >
          Save Changes
        </Button>
      )}
      <hr className="my-6" />
      <Typography variant="h3">Subscription Details</Typography>
      <SubscriptionDetailCard />
    </Box>
  );
};

export default MyProfileComponent;
