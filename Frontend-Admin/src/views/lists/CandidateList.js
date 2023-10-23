import React, { useState,useEffect } from "react";
import PageContainer from "src/components/container/PageContainer";
import { getAll } from "src/services/candidate.service";
import { Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Button, Stack,
    Typography, Modal, Box, Pagination } from "@mui/material";
import { Status } from "src/enum/Status";

const CandidateList = () => {
    const [candidates,setCandidates] = useState([]);
    const [open,setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalCandidate = candidates.length;
    const totalPages = Math.ceil(totalCandidate / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const candidatesOnCurrentPage = candidates.slice(startIndex, endIndex);
    // const currentTime = new Date();
    //Modal
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3
    };
    const handleOpen = (rowKey) => {
        setOpen(prevState => ({
            ...prevState,
            [rowKey]: true
        }));;
    };
    const handleClose = (rowKey) => {
        setOpen(prevState => ({
            ...prevState,
            [rowKey]: false
        }));
    };
    // call API Getall
    const getCandidates = async () => {
        const candidates = await getAll();
        setCandidates(candidates);
    }
    useEffect(() => {
        getCandidates();
    },[])

    //Pagination 
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return(
        <PageContainer title="Candidate List" description="this is Candidate List page">
            <Pagination 
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
            />
            <br/>
            <TableContainer component={Paper}> 
                <Table sx={{ Width: 800 }} aria-label="customized table">
                    <TableHead style={{backgroundColor: "#8da8e6"}}>
                        <TableRow>
                            <TableCell><Typography variant="h6">Name</Typography></TableCell>
                            <TableCell align="left"><Typography variant="h6">Email</Typography></TableCell>
                            <TableCell align="left"><Typography variant="h6">Phone Number</Typography></TableCell>
                            {/* <TableCell align="left"><Typography variant="h6">Pass</Typography></TableCell> */}
                            <TableCell align="left"><Typography variant="h6">ScoreFinal</Typography></TableCell>
                            <TableCell align="left"><Typography variant="h6">Status</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {candidatesOnCurrentPage.map((row) => (
                            <TableRow
                            key={row.email}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            // style={{opacity: (row.disabledUntil < currentTime) ? 0.5 : 1}}
                            >
                                <TableCell component="th" scope="row">
                                    <Typography variant="h6">{row.name}</Typography>
                                    <br/>
                                    <Stack spacing={2} direction="row">
                                        <Button variant="contained" onClick={() => handleOpen(row.name)}>Candidate Detail</Button>
                                            <Modal
                                                open={open[row.name] || false}
                                                onClose={() => handleClose(row.name)}
                                                aria-labelledby="child-modal-title"
                                                aria-describedby="child-modal-description"
                                            >
                                                <Box sx={{ ...style, width: 400 }}>
                                                    <Typography variant="h3" id="child-modal-title" style={{textAlign:'center'}}>Candidate Detail</Typography>
                                                    <br />
                                                    <Typography variant="body1"><b>Name</b> : {row.name}</Typography>
                                                    <Typography variant="body1"><b>Email</b> : {row.email}</Typography>
                                                    <Typography variant="body1"><b>Phone</b> : {row.phone}</Typography>
                                                    <Typography variant="body1"><b>Gender</b> : {row.gender}</Typography>
                                                    <Typography variant="body1"><b>Birthday</b> : {row.birthday}</Typography>
                                                    <Typography variant="body1"><b>Education Details</b> : {row.educationDetails}</Typography>
                                                    <Typography variant="body1"><b>Work Experience</b> : {row.workExperience}</Typography>
                                                    <Typography variant="body1"><b>UserName</b> : {row.username}</Typography>                                                                 
                                                </Box>
                                            </Modal>
                                            {/* <Button variant="contained" color="success"}>Show Test</Button> */}
                                            
                                        {/* <Button variant="contained" color="success">Update</Button>
                                        <Button variant="contained" color="error">Delete</Button>   */}
                                    </Stack>
                                </TableCell>
                                    <TableCell align="left"><Typography variant="h6">{row.email}</Typography></TableCell>
                                    <TableCell align="left"><Typography variant="h6">{row.phone}</Typography></TableCell>                                   
                                    {/* <TableCell align="left"><Typography variant="h6">{row.pass}</Typography></TableCell> */}
                                    <TableCell align="left"><Typography variant="h6">{row.scoreFinal}</Typography></TableCell>
                                    <TableCell align="left"><Typography variant="h6">{Status[row.statusId]}</Typography></TableCell>                                                        
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>                
        </PageContainer>
    );
}

export default CandidateList;