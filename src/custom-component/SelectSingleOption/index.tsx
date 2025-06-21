import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react"

const SelectSingleOption = (props:any) => {
    const {schema,fieldKey,selectedValue,setFieldValue} = props;
 
console.log(props)
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newValue: string | null
    ) => {
        if (newValue !== null) {
            console.log(newValue)
             setFieldValue(fieldKey,newValue)
        }
    };

   

    return (
        <div>
            <ToggleButtonGroup
                value={selectedValue}
                exclusive
                color="primary"
                onChange={handleChange}
                aria-label="looking for"
                className="rounded-lg border border-gray-300 overflow-hidden"
            >
                {schema?.map((value: any, index: number) => {
                    return <ToggleButton
                        key={index}
                        value={value?.key}
                        sx={{
                            textTransform: "none",
                            px: 4,
                            py: 1,
                            border: "none",
                            bgcolor: selectedValue === value?.key ? "#34d399" : "#f9fafb",
                            color: selectedValue ===  value?.key ? "white" : "#4b5563",
                            fontWeight: 500,
                            "&:hover": {
                                bgcolor: selectedValue ===  value?.key  ? "#10b981" : "#e5e7eb",
                            },
                        }}
                    >
                        {value?.name}
                    </ToggleButton>
                })}

            </ToggleButtonGroup>
        </div>
    );
};

export default SelectSingleOption;
