import * as React from "react";
import { useState, useCallback, useReducer, useEffect } from "react";
import ProgressBar from "../progressbar/ProgressBar";
import AnswerBox from "../answerBox/AnswerBox";
import _ from "lodash";
import { getQuestions, saveCandidateTest, savePoint } from "../../services/test.service";
import { Box, Button, CircularProgress } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import TimeStamp from "../timeStamp/TimeStamp";

const initialState = null;
const reducer = (state, action) => {
  switch (action.type) {
    case "quiz": {
      const qnaSet = _.cloneDeep(action.value || []);
      qnaSet.forEach((question) => {
        if (question.contentAnswer) { // Kiểm tra contentAnswer trước khi sử dụng
          question.contentAnswer.forEach((option) => {
            option.checked = false;
          });
        }
      });
      return qnaSet;
    }
    case "answer": {
      const question = _.cloneDeep(state);
      if (question[action.questionId]?.contentAnswer) { 
        question[action.questionId].contentAnswer[action.contentAnswerIndex].checked =
          action.value;
      }
      return question;
    }

    default:
      return state;
  }
};

export default function QuizMain2() {
  // get user
  const user = JSON.parse(localStorage.getItem("myQuizApp"));
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState([]);
  const [listQuiz, dispatch] = useReducer(reducer, initialState);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionId, setQuestionId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState("");
  const [testCode, setTestCode] = useState(0);


  const getTestQuestions = async () => {
    setLoading(true);
    const questions = await getQuestions();
    setQuiz(questions);
    const testCode = questions[0].testCode;
    setTestCode(testCode);
    setLoading(false);
    if (questions.length > 0) {
      setCurrentQuestion(0);
      setQuestionId(questions[0]?.questionId); 
    }
  }

  useEffect(() => {
    getTestQuestions();
  },[]) 

  useEffect(() => {
    if (listQuiz?.length === 0) {
      setTopics("General Knowledge");
    }
  }, [listQuiz]);

  useEffect(() => {
    dispatch({
      type: "quiz",
      value: quiz,
    });
  }, [quiz]);

  const handleAnswerChange = useCallback(
    (e, index) => {
      dispatch({
        type: "answer",
        questionId: currentQuestion,
        contentAnswerIndex: index,
        value: e.target.checked,
      });
    },
    [dispatch, currentQuestion]
  );

  // handle previous ques
  const previousQuestion = useCallback(() => {
    if (currentQuestion >= 1 && currentQuestion <= listQuiz?.length) {
      setCurrentQuestion((curr) => curr - 1);
    }

    if (
      listQuiz[currentQuestion - 1]?.topicName === "General Knowledge" ||
      currentQuestion <= 0
    ) {
      setTopics("General Knowledge");
    } else if (listQuiz[currentQuestion - 1]?.topicName === "Mathematics") {
      setTopics("Mathematics");
    } else {
      setTopics("Computer Technology");
    }
    // not allow to go back when the topic is over
    if (
      listQuiz[currentQuestion - 1]?.topicName === "General Knowledge" &&
      currentQuestion === 5
    ) {
      setTopics("General Knowledge");
      setCurrentQuestion((curr) => curr + 1);
    } else if (
      listQuiz[currentQuestion - 1]?.topicName === "Mathematics" &&
      currentQuestion === 10
    ) {
      setTopics("Mathematics");
      setCurrentQuestion((curr) => curr + 1);
    }
  }, [currentQuestion, listQuiz]);

  // handle next ques
  const nextQuestion = useCallback(() => {
    if (currentQuestion < listQuiz?.length - 1) {
      setCurrentQuestion((curr) => curr + 1);
    }
    if (listQuiz[currentQuestion + 1]?.topicName === "General Knowledge") {
      setTopics("General Knowledge");
    } else if (listQuiz[currentQuestion + 1]?.topicName === "Mathematics") {
      setTopics("Mathematics");
    } else {
      setTopics("Computer Technology");
    }

    if (currentQuestion === 4) {
      alert(
        "You have completed the 'General Knowledge' question set, click OK to start the 'Mathematics' question set."
      );
    } else if (currentQuestion === 9) {
      alert(
        "You have completed the 'Mathematics' question set, click OK to start the 'Computer Technology' question set."
      );
    }
  }, [currentQuestion, listQuiz]);

  // progress percentage
  const progressPercentage =
    listQuiz?.length > 0 ? ((currentQuestion + 1) * 100) / listQuiz?.length : 0;

  // submit quiz and store result
  const submitQuiz = useCallback(async () => {
    function getResult() {
      let correctGeneralAnswersCount = 0;
      let incorrectGeneralAnswersCount = 0;
      let correctMathAnswersCount = 0;
      let incorrectMathAnswersCount = 0;
      let correcTechnologyAnswersCount = 0;
      let incorrecTechnologyAnswersCount = 0;

      listQuiz?.forEach((question, index1) => {
        const correctOptions = question.contentAnswer
        .filter((option) => option.correct)
        .map((option) => option.title);

      const selectedOptions = question.contentAnswer
        .filter((option) => option.checked)
        .map((option) => option.title);

      if (question.topicName === "General Knowledge") {
        if (_.isEqual(correctOptions.sort(), selectedOptions.sort())) {
          correctGeneralAnswersCount += 1;
        } else {
          incorrectGeneralAnswersCount += 1;
        }
      } else if (question.topicName === "Mathematics") {
        if (_.isEqual(correctOptions.sort(), selectedOptions.sort())) {
          correctMathAnswersCount += 1;
        } else {
          incorrectMathAnswersCount += 1;
        }
      } else if (question.topicName === "Computer Technology") {
        if (_.isEqual(correctOptions.sort(), selectedOptions.sort())) {
          correcTechnologyAnswersCount += 1;
        } else {
          incorrecTechnologyAnswersCount += 1;
        }
      }
    });

      const totalPoint = Math.ceil(
        (correctGeneralAnswersCount +
          correctMathAnswersCount +
          correcTechnologyAnswersCount) *
          (100 / listQuiz?.length)
      );
      const userAnswers = [];
      listQuiz.forEach((question) => {
        const { questionId, contentAnswer } = question;
        const contentAnswers = contentAnswer
          .filter((option) => option.checked)
          .map((option) => option.title);
    
        if (contentAnswers.length > 0) {
          contentAnswers.forEach((contentAnswers) => {
            userAnswers.push({ testCode, questionId, contentAnswers });
          });
        } else {
          userAnswers.push({ testCode, questionId, contentAnswers:"" });
        }
      });
      userAnswers.forEach((answer) => {
        saveCandidateTest(answer);
      })
      return [
        correctGeneralAnswersCount,
        incorrectGeneralAnswersCount,
        correctMathAnswersCount,
        incorrectMathAnswersCount,
        correcTechnologyAnswersCount,
        incorrecTechnologyAnswersCount,
        totalPoint,
      ];
    }

    const [
      correctGeneralAnswersCount,
      incorrectGeneralAnswersCount,
      correctMathAnswersCount,
      incorrectMathAnswersCount,
      correcTechnologyAnswersCount,
      incorrecTechnologyAnswersCount,
      totalPoint,
    ] = getResult();

    const dataResult = {
      correctGeneralAnswersCount: correctGeneralAnswersCount,
      incorrectGeneralAnswersCount: incorrectGeneralAnswersCount,
      correctMathAnswersCount: correctMathAnswersCount,
      incorrectMathAnswersCount: incorrectMathAnswersCount,
      correcTechnologyAnswersCount: correcTechnologyAnswersCount,
      incorrecTechnologyAnswersCount: incorrecTechnologyAnswersCount,
      totalPoint,
      listQuiz: { ...listQuiz },
    };
    await savePoint(user.id,totalPoint,testCode);
    user.totalScore = totalPoint;
    user.status = (user.totalScore >= 40) ? 1 :2 ;
    localStorage.setItem("myQuizApp", JSON.stringify(user));
    navigate(`/result`, { state: { dataResult } });
  }, [listQuiz, navigate]);


  

  return (
    <>
      {user ? (
        <div className="quiz-main">
          {/* tab */}
          <div className="quiz-main__top">
            <Button
              variant="contained"
              disabled={topics !== "General Knowledge"}
            >
              General Knowledge
            </Button>
            <Button
              variant="contained"
              disabled={topics !== "Mathematics"}
              sx={{ mx: 2 }}
            >
              Mathematics
            </Button>
            <Button
              variant="contained"
              disabled={topics !== "Computer Technology"}
            >
              Computer Technology
            </Button>
            <div className="flex max-w-fit flex-col ml-auto space-x-3 mb-10">
            <TimeStamp
              submitQuiz = {submitQuiz}
            />
            </div>
          </div>

          

          {/* answer box */}
          {loading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress size={40} color="secondary" />
            </Box>
          ) : (
            listQuiz?.length > 0 && (
              <div className="quiz-main__mid frame-BG rounded-md">
                <div className="flex flex-col items-center justify-center text-xl font-bold text-darkText dark:text-lightText sm:text-3xl">
                  Question {currentQuestion + 1}: {listQuiz[currentQuestion]?.contentQuestion}
                </div>
                <hr className="mt-3 mb-8 h-px border-0 bg-gray-400 dark:bg-gray-600" />

                <AnswerBox
                  contentAnswer={listQuiz[currentQuestion]?.contentAnswer}
                  handleChange={handleAnswerChange}
                />
              </div>
            )
          )}

          {/* progress-bar */}
          <div className="quiz-main__bot">
            <ProgressBar
              nextQ={nextQuestion}
              prevQ={previousQuestion}
              progress={progressPercentage}
              submit={submitQuiz}
            />
          </div>
        </div>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
}
