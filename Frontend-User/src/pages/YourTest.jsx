import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import AnimateProvider from "../components/AnimateProvider/AnimateProvider";
import { useNavigate } from "react-router-dom";
import { getCandidateTest } from "../services/test.service";


const YourTest = () => {
  const user = JSON.parse(localStorage.getItem("myQuizApp"));
  const navigate = useNavigate();
  const indxColor =
    user.totalScore >= 75 ? "#10b981" : user.totalScore >= 40 ? "#F59E0B" : "#dc2626";
  const [candidateTest,setCandidateTest] = useState([]);
  const getCandidateTests = async () => {
    const candidateTest = await getCandidateTest(user.id);
    setCandidateTest(candidateTest);
}
useEffect(() => {
    getCandidateTests();
},[])
  return(
    <div>
      <Header/>
      <br/><br/><br/>
      <div style={{ backgroundColor: "white"}}>
        <AnimateProvider className="flex flex-col space-y-10 md:max-w-xl md:mx-auto">
          <h3 className="text-lg text-center text-neutral-900 font-bold md:text-xl">
          Your Final score is
          </h3>
          <h1
            style={{
              background: indxColor,
            }}
            className={`text-5xl font-bold mx-auto p-5 rounded-full bg-red-500 md:text-6xl text-neutral-100`}
          >
            {user.totalScore}
          </h1>
          <button
            onClick={() => navigate("/")}
            className="grid place-items-center text-neutral-50 bg-orange-500 rounded-full py-2 hover:text-neutral-50 text-sm font-semibold"
          >
            Back to home
          </button>
          <h3 className="text-center text-neutral-600 font-semibold">
          Answer
          </h3>
          {candidateTest.map((row, i) => (
            <section key={i}>
            <div className="flex items-start space-x-3 text-base md:text-lg mb-10">
              <h3 className="text-gray-800 font-semibold text-center">{i+1}</h3>     
              <h3 className="text-gray-800 font-semibold">{row.contentQuestion}</h3>
            </div>
            {row.contentAnswer.map((answer, index) => (
              <div key={index}>
                {index === 0 && <p className="font-semibold">Your answer: {row.candidateAnswer.join(', ')}</p>}
              </div>
            ))}
            {row.contentAnswer.map((answer,index) => (
                <div key={index}
                  style={{
                    background: row.correctAnswer.includes(answer) ? "rgb(144, 238, 144)" : "",
                    color: row.correctAnswer.includes(answer) ? "rgb(14, 85, 4)" : ""
                  }}
                  className={`flex items-center space-x-3 mb-5 text-neutral-600 bg-neutral-200/50 rounded-full py-3 px-3  text-xs md:text-sm active:text-neutral-50 active:bg-orange-500/90 font-medium 
                    ${row.correctAnswer.includes(answer)
                      ? "bg-green-200 text-green-800 font-semibold"
                      : ""
                    }`}>
                  <p>{index + 1}.</p>          
                  <p>{answer}</p>
                </div>
            ))}
          </section>
          ))}
        </AnimateProvider>
      </div>
    </div>
  )
}

export default YourTest;