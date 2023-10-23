import React, { useState,useEffect } from "react";
import PageContainer from "src/components/container/PageContainer";
import { Select, MenuItem, Box, FormControl, InputLabel, TextField } from "@mui/material";
import { Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Button, Stack,
    Typography, Modal, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Pagination } from "@mui/material";
import { deleteQuestion, getAll,searching } from "src/services/question.service";
import { topicName } from "src/enum/Topic";
import { typeQuestion } from "src/enum/Type";
import { difficultyLevel } from "src/enum/DifficultLevel";

const QuestionList = () => {
    const [questions,setQuestions] = useState([]);
    const [open,setOpen] = useState(false);
    const [openDialog,setOpenDialog] = useState(false);
    const [topicValue,setTopicValue] = useState('');
    const [typeValue,setTypeValue] = useState('');
    const [search,setSearch] = useState('');
    const [difficultyValue,setDifficultyValue] = useState('');
    const topics = Object.keys(topicName);
    const types = Object.keys(typeQuestion);
    const difficultyLevels = Object.keys(difficultyLevel);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalQuestions = questions.length;
    const totalPages = Math.ceil(totalQuestions / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const questionsOnCurrentPage = questions.slice(startIndex, endIndex);
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
    const handleOpenModal = (rowKey) => {
        setOpen(prevState => ({
            ...prevState,
            [rowKey]: true
        }));;
    };
    const handleCloseModal = (rowKey) => {
        setOpen(prevState => ({
            ...prevState,
            [rowKey]: false
        }));
    };
    const handleOpenDialog = (rowKey) => {
        setOpenDialog(prevState => ({
            ...prevState,
            [rowKey]: true
        }));
    };
    
      const handleCloseDialog = (rowKey) => {
        setOpenDialog(prevState => ({
            ...prevState,
            [rowKey]: false
        }));
    };
    // call API Getall
    const getQuestions = async () => {
        const questions = await getAll();
        setQuestions(questions);
    }
    useEffect(() => {
        getQuestions();
    },[])
    

    const handleDelete = async(id) => {
        await deleteQuestion(id);
        setQuestions((prevList) => prevList.filter((question) => question.questionId !== id));
        handleCloseDialog();
    }

    //Pagination 
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleSearch = async (e) => {
        const questions = await searching(search,topicValue,typeValue,difficultyValue);
        if (Array.isArray(questions)) {
            setQuestions(questions);
        }
    }
    useEffect(() => {
        handleSearch();
    },[search,topicValue,typeValue,difficultyValue])

    return (
        <PageContainer title="QuestionList" description="this is QuestionList page">
            {/* Searching Bar */}
            <Box style={{marginBottom: "10px"}}>
                <TextField
                    id="outlined-basic" 
                    label="Search" 
                    variant="outlined" 
                    sx={{ minWidth: 400 }} 
                    style={{marginRight: "5px"}}
                    onChange={(e) => setSearch(e.target.value)}
                ></TextField>
                <FormControl sx={{ minWidth: 200 }} style={{marginRight: "5px"}}>
                    <InputLabel id="demo-simple-select-label">Topic</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Topic"
                        onChange={(e) => setTopicValue(e.target.value)}
                        value={topicValue ? topicValue : ""}
                    >
                    {
                        topics.map(key => (
                            <MenuItem key={key} value={topicName[key]}>{topicName[key]}</MenuItem>
                        ))
                    }
                    </Select>         
                </FormControl>
                <FormControl sx={{ minWidth: 100 }} style={{marginRight: "5px"}}>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Type"
                    onChange={(e) => setTypeValue(e.target.value)}
                    value={typeValue ? typeValue : ""}
                    >
                    {
                        types.map(key => (
                            <MenuItem key={key} value={typeQuestion[key]}>{typeQuestion[key]}</MenuItem>
                        ))
                    }
                    </Select>         
                </FormControl>
                <FormControl sx={{ minWidth: 150 }} style={{marginRight: "5px"}}>
                    <InputLabel id="demo-simple-select-label">Difficult</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Difficult"
                    onChange={(e) => setDifficultyValue(e.target.value)}
                    value={difficultyValue ? difficultyValue : ""}
                    >
                    {
                        difficultyLevels.map(key => (
                            <MenuItem key={key} value={difficultyLevel[key]}>{difficultyLevel[key]}</MenuItem>
                        ))
                    }
                    </Select>         
                </FormControl>
                {/* <Button variant="contained" style={{justifyContent:"flex-end"}}>Create Question</Button> */}
            </Box>
            {/* Table Question */}
            <Pagination 
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
            />
            <br/>
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
                        {questionsOnCurrentPage.map((row) => (
                            <TableRow
                            key={row.questionId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                <Typography variant="h6">{row.contentQuestion}</Typography>
                                <br/>
                                <Stack spacing={2} direction="row">
                                    <Button variant="contained" onClick={() => handleOpenModal(row.questionId)}>Answer</Button>
                                        <Modal
                                            open={open[row.questionId] || false}
                                            onClose={() => handleCloseModal(row.questionId)}
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
                                                            border: row.correctAnswers.includes(answer) ? '1px solid #00cc00' : '1px solid red',
                                                            borderRadius: '10px',
                                                            padding:'8px',
                                                            margin:'2px',
                                                            color: row.correctAnswers.includes(answer) ? '#00cc00' : 'red',
                                                            width: '400px'
                                                        }}>{answer}</li>
                                                    ))}
                                                </ul>                                      
                                            </Box>
                                        </Modal>
                                    {/* <Button variant="contained" color="success">Update</Button> */}
                                    <Button variant="contained" color="error" onClick={() => handleOpenDialog(row.questionId)}>Delete</Button>
                                    <Dialog open={openDialog[row.questionId] || false} onClose={() => handleCloseDialog(row.questionId)}>
                                        <DialogTitle>Confirm</DialogTitle>
                                        <DialogContent>
                                        <DialogContentText>
                                            Are you sure you want to delete this question?
                                        </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                        <Button onClick={() => handleCloseDialog(row.questionId)} color="primary">
                                            No
                                        </Button>
                                        <Button onClick={() => handleDelete(row.questionId)} color="secondary" autoFocus>
                                            Yes
                                        </Button>
                                        </DialogActions>
                                    </Dialog>  
                                </Stack>
                            </TableCell>
                            <TableCell align="right"><Typography variant="h6">{row.topicName}</Typography></TableCell>
                            <TableCell align="right"><Typography variant="h6">{row.type}</Typography></TableCell>
                            <TableCell align="right"><Typography variant="h6">{difficultyLevel[row.difficultyLevel]}</Typography></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </PageContainer>
    );
};

export default QuestionList;