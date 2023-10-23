import React, { useState } from "react";  
import PageContainer from "src/components/container/PageContainer";
import { Typography,
    Checkbox , FormControl,
    TextField, Select,
    Button,
    Box,
    FormControlLabel,
    MenuItem } from "@mui/material";
import { topicName } from "src/enum/Topic";
import { typeQuestion } from "src/enum/Type";
import { difficultyLevel } from "src/enum/DifficultLevel";
import { createQuestion } from "src/services/question.service";
import { useNavigate } from "react-router";

const CreateQuestion = () => {
    const topics = Object.keys(topicName);
    const types = Object.keys(typeQuestion);
    const difficultyLevels = Object.keys(difficultyLevel);
    const [questionData, setQuestionData] = useState({
        topicName: "",
        contentQuestion: "",
        type: "",
        difficultyLevel: 0,
        contentAnswers: [''],
        correctAnswers: [false]
    });
    const history = useNavigate();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setQuestionData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
        console.log(questionData);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (questionData.type === "radio" && questionData.correctAnswers.filter((correct) => correct).length > 1) {
            alert("Select the question type as Checkbox if there are multiple correct answers.");
            return;
        }
        await createQuestion(questionData);
        history("/ui/questionlist");
    }
    const handleAnswerChange = (index,event) => {
        const newContentAnswers = [...questionData.contentAnswers];
        newContentAnswers[index] = event.target.value;
        setQuestionData((prevData) => ({
        ...prevData,
        contentAnswers: newContentAnswers
        }));
        console.log(questionData);
    }
    const handleCorrectAnswerChange = (index) => {
        const newCorrectAnswers = [...questionData.correctAnswers];
        newCorrectAnswers[index] = true;
        setQuestionData((prevData) => ({
        ...prevData,
        correctAnswers: newCorrectAnswers,
        }));
        console.log(questionData);
    }
    const handleAddAnswer = () => {
        setQuestionData((prevData) => ({
            ...prevData,
            contentAnswers: [...prevData.contentAnswers, ''],
            correctAnswers: [...prevData.correctAnswers, false]
        }));
    }
    return (
        <PageContainer title="CreateQuestion" description="this is CreatQuestion page">  
            <Typography variant="h3" style={{textAlign: "left"}}>Create Question</Typography>
            <br/>
                <form onSubmit={handleSubmit}>
                    <Box className="row">
                        <Box className="col">
                            <Typography variant="h6">Content Question</Typography>
                            <TextField
                                style={{ width: "80%", margin: "10px" }}
                                type="text"
                                placeholder="Content Question"
                                variant="outlined"
                                name="contentQuestion"
                                value={questionData.contentQuestion}
                                onChange={handleChange}
                            />
                            <br />
                            <br />
                            <Typography variant="h6" style={{ margin: "10px" }}>Answers</Typography>
                            {questionData.contentAnswers.map((answer, index) => (
                                <Box className="row" key={index}>                               
                                        <Box className="col">
                                        <TextField
                                            style={{ width: "100%", margin: "5px" }}
                                            type="text"
                                            placeholder="Answer"
                                            variant="outlined"
                                            onChange={(event) => handleAnswerChange(index, event)}
                                            value={answer}
                                        />
                                        </Box>
                                        <Box className="col">
                                        <FormControlLabel 
                                            style={{display: "flex",margin: "5px"}} 
                                            control= {
                                                <Checkbox
                                                    checked={questionData.correctAnswers[index]}
                                                    onChange={() => handleCorrectAnswerChange(index)} 
                                                />
                                            } 
                                            label="Correct Answer" 
                                        />                                  
                                    </Box>
                                </Box>
                            ))}
                            <Box>
                                <Button variant="outlined" color="primary" onClick={handleAddAnswer}>Add answer</Button>
                            </Box>  
                        </Box>
                        <Box className="col">
                            <Typography variant="h6">Topic</Typography>
                            <FormControl sx={{ minWidth: 200 }} style={{marginRight: "5px"}}>
                                <Select
                                    style={{margin: '5px'}} 
                                    onChange={handleChange} 
                                    name="topicName"
                                    defaultValue="">
                                {
                                    topics.map(key => (
                                        <MenuItem key={key} value={topicName[key]}>{topicName[key]}</MenuItem>
                                    ))
                                }
                                </Select>         
                            </FormControl>
                            <br />
                            <br />
                            <Typography variant="h6">Type Question</Typography>
                            <FormControl sx={{ minWidth: 200 }} style={{marginRight: "5px"}}>
                                <Select
                                    style={{margin: '5px'}} 
                                    onChange={handleChange} 
                                    name="type"
                                    defaultValue="">
                                {
                                    types.map(key => (
                                        <MenuItem key={key} value={typeQuestion[key]}>{typeQuestion[key]}</MenuItem>
                                    ))
                                }
                                </Select>         
                            </FormControl>
                            <br />
                            <br />
                            <Typography variant="h6">Difficult Level</Typography>
                            <FormControl sx={{ minWidth: 200 }} style={{marginRight: "5px"}}>
                                <Select 
                                    style={{margin: '5px'}}     
                                    onChange={handleChange} 
                                    name="difficultyLevel"
                                    defaultValue=""
                                    >
                                {
                                    difficultyLevels.map((key) => (
                                        <MenuItem key={key} value={difficultyLevel[key]}>{difficultyLevel[key]}</MenuItem>
                                    ))
                                }
                                </Select>         
                            </FormControl>
                            <br/>
                            <Button variant="contained" color="primary" type="submit">
                            Create Question
                            </Button>
                        </Box>
                    </Box>
                </form>
            
        </PageContainer>
    );
}

export default CreateQuestion;