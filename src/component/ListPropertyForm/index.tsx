import { Box, Button, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import SubscriptionDetailCard from "../SubscriptionDetailCard";
import PropertyForm from "../PropertyListingComponents/PropertyDetail";

const ListPropertyForm = () => {
    const [age, setAge] = useState('');

    const handleChange = (event: any) => {
        setAge(event.target.value as string);
    };
    return <PropertyForm/>
}
export default ListPropertyForm;