import React, { useState } from "react";
import PageContainer from "src/components/container/PageContainer";
import { Typography,
    FormControl,
    TextField, Select,
    Box, Button,
    MenuItem } from "@mui/material";
import { gender } from "src/enum/Gender";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createCandidate } from "src/services/candidate.service";
import { useNavigate } from "react-router";
import "../../assets/images/css/createAccount.css";

const CreateAccount = () => {
    const genders = Object.keys(gender);
    const [candidateData, setCandidateData] = useState({
        email: "",
        name: "",
        gender: "",
        birthday: "",
        phone: "",
        educationDetails: "",
        workExperience: ""
    });
    const history = useNavigate();
    
    const isEmailValid = (email) => {
        // Regular expression to check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const handleDateChange = (date) => {
        setCandidateData({
            ...candidateData,
            birthday: date
        });
        console.log(candidateData);
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setCandidateData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
        console.log(candidateData);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await createCandidate(candidateData);
        history("/ui/candidatelist");
    }
    return(
        <PageContainer title="CreateAccount" description="this is CreatAccount page">
            <Typography variant="h3" style={{textAlign: "left"}}>Create Candidate Account</Typography>
            <br /> 
            <form onSubmit={handleSubmit}>
                <Box className="row">
                    <Box className="col">
                        <Typography variant="h6">Name</Typography>
                        <TextField
                            style={{ width: "80%", margin: "5px" }}
                            type="text"
                            placeholder="Name"
                            variant="outlined"
                            name="name"
                            value={candidateData.name}
                            onChange={handleChange}
                            required
                        />
                        <br/>
                        <br/>
                        <Typography variant="h6">Email</Typography>
                        <TextField
                            style={{ width: "80%", margin: "5px" }}
                            type="email"
                            placeholder="Email"
                            variant="outlined"
                            name="email"
                            value={candidateData.email}
                            onChange={handleChange}
                            onBlur={(event) => {
                                if (!isEmailValid(event.target.value)) {
                                  event.target.setCustomValidity('Invalid email format');
                                } else {
                                  event.target.setCustomValidity('');
                                }
                              }}
                            required
                        />
                        <br/>
                        <br/>
                        <Typography variant="h6">Phone Number</Typography>
                        <TextField
                            style={{ width: "80%", margin: "5px" }}
                            type="phone"
                            placeholder="Phone Number"
                            variant="outlined"
                            name="phone"
                            value={candidateData.phone}
                            onChange={handleChange}
                            required
                        />
                        <br/>
                        <br/>
                        <Typography variant="h6">Education Details</Typography>
                        <TextField
                            style={{ width: "80%", margin: "5px" }}
                            type="text"
                            placeholder="Education Details"
                            variant="outlined"
                            name="educationDetails"
                            value={candidateData.educationDetails}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    <Box className="col">
                        <Typography variant="h6">Work Experience</Typography>
                        <TextField
                            style={{ width: "80%", margin: "5px" }}
                            type="text"
                            placeholder="Work Experience"
                            variant="outlined"
                            name="workExperience"
                            value={candidateData.workExperience}
                            onChange={handleChange}
                            required
                        />
                        <br/>
                        <br/>
                        <Typography variant="h6">Gender</Typography>
                        <FormControl sx={{ minWidth: 200 }} style={{marginRight: "5px"}}>
                            <Select
                                style={{margin: '5px'}} 
                                onChange={handleChange} 
                                name="gender"
                                defaultValue=""
                                required>
                            {
                                genders.map(key => (
                                    <MenuItem key={key} value={gender[key]}>{gender[key]}</MenuItem>
                                ))
                            }
                            </Select>         
                        </FormControl>
                        <br/>
                        <br/>
                        <Typography variant="h6">Birthday</Typography>
                        <div className="date-picker">
                        <DatePicker  style={{marginRight: "5px", padding: "50px"}} selected={candidateData.birthday} onChange={handleDateChange} required />
                        </div>
                    </Box>
                </Box>
                <Button variant="contained" color="primary" type="submit">
                    Create Account
                </Button>
            </form>
        </PageContainer>  
    );
}

export default CreateAccount;