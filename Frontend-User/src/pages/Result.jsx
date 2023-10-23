import React from "react";
import CardScore from "../components/card/CardScore.1";
import person from "../asset/images/person.png";
import Header from "../components/header/Header";
import { useLocation } from "react-router-dom";

export default function Result() {
  const location = useLocation();
  const { dataResult } = location?.state;

  const {
    correctGeneralAnswersCount,
    incorrectGeneralAnswersCount,
    correctMathAnswersCount,
    incorrectMathAnswersCount,
    correcTechnologyAnswersCount,
    incorrecTechnologyAnswersCount,
    totalPoint,
  } = dataResult;

  return (
    <div>
      <Header />
      <div className="result-page">
        <img
          className="w-[60%] max-w-lg object-cover sm:w-[50%] mr-10"
          src={person}
          alt="person"
        />
        <div className="flex flex-col items-center justify-center">
          <CardScore
            correctGeneralAnswersCount={correctGeneralAnswersCount}
            incorrectGeneralAnswersCount={incorrectGeneralAnswersCount}
            correctMathAnswersCount={correctMathAnswersCount}
            incorrectMathAnswersCount={incorrectMathAnswersCount}
            correcTechnologyAnswersCount={correcTechnologyAnswersCount}
            incorrecTechnologyAnswersCount={incorrecTechnologyAnswersCount}
            totalPoint={totalPoint}
          />
        </div>
      </div>
    </div>
  );
}
