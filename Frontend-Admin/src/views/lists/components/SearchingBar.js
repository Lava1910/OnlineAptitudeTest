import React, { useState } from "react";
import { Select, MenuItem, Box, FormControl, InputLabel, TextField } from "@mui/material";

const SearchingBar = () => {
    const [inputText,setInputText] = useState("");
    let inputHandler = (e) => {
        var lowerCase = e.target.value.toLowCase();
        setInputText(lowerCase);
    }
    return (
        <Box style={{marginBottom: "10px"}}>
            <TextField
                id="outlined-basic" 
                label="Question" 
                variant="outlined" 
                sx={{ minWidth: 400 }} 
                style={{marginRight: "5px"}}
                onChange={inputHandler}
            ></TextField>
            <FormControl sx={{ minWidth: 200 }} style={{marginRight: "5px"}}>
                <InputLabel id="demo-simple-select-label">Topic</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Topic"
                >
                <MenuItem>Ten</MenuItem>
                <MenuItem>Twenty</MenuItem>
                <MenuItem>Thirty</MenuItem>
                </Select>         
            </FormControl>
            <FormControl sx={{ minWidth: 100 }} style={{marginRight: "5px"}}>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Type"
                >
                <MenuItem>radio</MenuItem>
                <MenuItem>checkbox</MenuItem>
                </Select>         
            </FormControl>
            <FormControl sx={{ minWidth: 150 }} style={{marginRight: "5px"}}>
                <InputLabel id="demo-simple-select-label">Difficult</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Difficult"
                >
                <MenuItem>1</MenuItem>
                <MenuItem>2</MenuItem>
                <MenuItem>3</MenuItem>
                </Select>         
            </FormControl>
            {/* <Button variant="contained" style={{justifyContent:"flex-end"}}>Create Question</Button> */}
        </Box>
    );
}

export default SearchingBar;