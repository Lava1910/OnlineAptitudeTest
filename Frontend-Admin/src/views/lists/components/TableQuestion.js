import React, { useState,useEffect } from "react";
import { Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Button, Stack,
    Typography, Modal, Box } from "@mui/material";
import { getAll } from "src/services/question.service";

const TableQuestion = () => {
    const [questions,setQuestions] = useState([]);
    const [open,setOpen] = useState(false);
    //style modal
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
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const getQuestions = async () => {
        const quesitons = await getAll();
        setQuestions(quesitons);
    }
    useEffect(() => {
        getQuestions();
    },[])

    return(
        <TableContainer component={Paper}>            
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
                <TableHead style={{backgroundColor: "#8da8e6"}}>
                    <TableRow>
                        <TableCell><Typography variant="h5">Question</Typography></TableCell>
                        <TableCell align="right"><Typography variant="h5">Topic</Typography></TableCell>
                        <TableCell align="right"><Typography variant="h5">Type</Typography></TableCell>
                        <TableCell align="right"><Typography variant="h5">Difficult</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {questions.map((row) => (
                        <TableRow
                        key={row.contentQuestion}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            <Typography variant="h6">{row.contentQuestion}</Typography>
                            <br/>
                            <Stack spacing={2} direction="row">
                                <Button variant="contained" onClick={handleOpen}>Answer</Button>
                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="child-modal-title"
                                        aria-describedby="child-modal-description"
                                    >
                                        <Box sx={{ ...style, width: 600 }}>
                                            <h3 id="child-modal-title">{row.contentQuestion}</h3>
                                            <ul>
                                                {row.contentAnswer.map((answer,index) => (
                                                <li key={index} 
                                                    style= {{ 
                                                        listStyle: 'none',
                                                        border: row.correctAnswers.includes(answer) ? '1px solid #00cc00' : '1px solid black',
                                                        borderRadius: '10px',
                                                        padding:'8px',
                                                        margin:'2px',
                                                        color: row.correctAnswers.includes(answer) ? '#00cc00' : 'black',
                                                        width: '400px'
                                                    }}>{answer}</li>
                                                ))}
                                            </ul>                                      
                                            <Button onClick={handleClose} variant="contained">Close</Button>
                                        </Box>
                                    </Modal>
                                <Button variant="contained" color="success">Update</Button>
                                <Button variant="contained" color="error">Delete</Button>  
                            </Stack>
                        </TableCell>
                        <TableCell align="right"><Typography variant="h6">{row.topicName}</Typography></TableCell>
                        <TableCell align="right"><Typography variant="h6">{row.type}</Typography></TableCell>
                        <TableCell align="right"><Typography variant="h6">{row.difficultyLevel}</Typography></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TableQuestion;