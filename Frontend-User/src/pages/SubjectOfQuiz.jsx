import React from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";

export default function SubjectOfQuiz() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("myQuizApp"));

  const handleStartQuiz = () => {
    if (user) {
      navigate("/quiz/game");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Header />
      <div className="subject-of-quiz w-full pt-[100px]">
        <div className="subject-of-quiz__title w-[80%] m-auto text-[18px]">
          <p className="my-3 indent-7">
            Welcome to our group's recruitment test.
          </p>
          <p className="my-3 indent-7">
          To apply to the group you need to complete the test below. The test includes 3 parts: General Knowledge - Mathematics - Computer Technology. You must complete all questions in each topic set in turn according to our instructions below.
          </p>
          <p className="my-3 indent-7">
            <span className="text-red-600 font-semibold">Note:</span> "Do not log out once you have started taking the test. If you quit, the test will not be accepted. The test includes 15 questions for each question topic with both easy and difficult levels. The exam time is 30 minutes. After the exam time, your exam will be automatically scored. You can complete the exam early when you answer all the questions on the 3 topics we give and click "Submit" to submit and see your score. We will consider your application based on your score on the test.”
          </p>
          <p className="my-3 indent-7">
            Please follow the instructions below to start taking the test:            
          <ul style={{ listStyle: "disc" }} className="mt-2 ml-12">
              <li>Select the general knowledge section (required).</li>
              <li>Answer all 5 questions of the general knowledge topic.</li>
              <li>Then click "Submit".</li>
              <li>
                A message will appear on the screen, click "OK" to move to the next topic, Mathematics.
              </li>
              <li>
              Similarly, when you finish completing 5 questions of the math topic, click "Submit" and select ok to move on to the Computer Technology topic.
              </li>
              <li>
              After completing the above 3 topics, click "Submit" and you will see your score.
              </li>
            </ul>
          </p>
        </div>
        
        <Grid
          container
          spacing={3}
          pb={6}
          sx={{
            maxWidth: "80%",
            margin: "0 auto",
          }}
        >
          {/* card-tab */}
          <Grid item xs={12} md={6} lg={4}>
            <Button
              sx={{
                border: "1px solid #334155",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
            >
              <Card sx={{ minHeight: 250, minWidth: 360 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image="https://vietit.vn/media/upload/kien_thuc_web/7-kien-thuc-hinh-anh-1.png"
                    alt="general_knowledge"
                    sx={{ maxHeight: 150, maxWidth: "100%" }}
                  />
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ fontWeight: "bold" }}
                    >
                      General Knowledge
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        border: "1px solid #acacac",
                        borderRadius: "5px",
                        padding: "5px",
                        marginTop: "10px",
                      }}
                    >
                      <Typography variant="body1">5 questions</Typography>
                      <Typography variant="body1">33 points</Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Button>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Button
              sx={{
                border: "1px solid #334155",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
            >
              <Card sx={{ minHeight: 250, minWidth: 360 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image="https://giasudaykemtainha.vn/uploads/posts/Toan-hoc-la-gi-Nhung-cach-hoc-gioi-Toan.jpg"
                    alt="mathematics"
                    sx={{ maxHeight: 150, maxWidth: "100%" }}
                  />
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ fontWeight: "bold" }}
                    >
                      Mathematics
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        border: "1px solid #acacac",
                        borderRadius: "5px",
                        padding: "5px",
                        marginTop: "10px",
                      }}
                    >
                      <Typography variant="body1">5 questions</Typography>
                      <Typography variant="body1">33 points</Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Button>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Button
              sx={{
                border: "1px solid #334155",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
            >
              <Card sx={{ minHeight: 250, minWidth: 360 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image="https://aptechbmt.edu.vn/uploads/news/2019_07/hoc-lap-trinh.jpg"
                    alt="computer_tech"
                    sx={{ maxHeight: 150, maxWidth: "100%" }}
                  />
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ fontWeight: "bold" }}
                    >
                      Computer Technology
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        border: "1px solid #acacac",
                        borderRadius: "5px",
                        padding: "5px",
                        marginTop: "10px",
                      }}
                    >
                      <Typography variant="body1">5 questions</Typography>
                      <Typography variant="body1">34 points</Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Button>
          </Grid>
        </Grid>
        <Button variant="contained" onClick={handleStartQuiz} style={{fontSize : "24px", marginBottom: "10px"}} className="btn-start">
            Start
          </Button>
          <br/>         
      </div>
    </>
  );
}
