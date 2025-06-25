import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState,useEffect } from 'react';
import { Autocomplete, Divider, Stack, TextField } from '@mui/material';
import { LocationSearch } from '@/custom-component';
import { searchPropertiesApi } from '@/pages/list-property/apis';

export default function FilterNavbar({setLocation}:{setLocation:any}) {
  const [value, setValue] = React.useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };




  return (
    <Stack width='100%' direction="row" justifyContent={"space-between"}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Item One" />
        <Tab value="two" label="Item Two" />
        <Tab value="three" label="Item Three" />
      </Tabs>
      <Stack direction={"row"} gap={3}>
       <LocationSearch setLocation={setLocation} /> 
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          sx={{ width: 100 }}
          renderInput={(params) => <TextField {...params} label="Gender" />}
        />
      </Stack>

    </Stack>
  );
}
const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  }]