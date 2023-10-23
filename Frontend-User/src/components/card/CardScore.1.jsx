import React from "react";

export default function CardScore({
  correctGeneralAnswersCount,
  incorrectGeneralAnswersCount,
  correctMathAnswersCount,
  incorrectMathAnswersCount,
  correcTechnologyAnswersCount,
  incorrecTechnologyAnswersCount,
  totalPoint,
}) {
  return (
    <div className="score-card frame-BG flex flex-col rounded-xl lg:w-[500px]">
      <span className="score-card-heading mb-2 w-full text-center text-4xl font-semibold uppercase tracking-wider text-darkText drop-shadow-xl dark:text-dullWhite">
        Result
      </span>
      <span className="score-per mb-4 w-full text-center text-2xl text-purple-600 font-bold drop-shadow-xl">
      Achieve {totalPoint}%
      </span>
      <hr className="mb-6 h-px border-0 bg-gray-400 dark:bg-gray-600" />

      <div className="[&>*]:text-lg [&>*]:lg:text-2xl">
        <div className="score-row text-purple-600">
          <p className="text-left">Topic</p>
          <p>Correct</p>
          <p>Wrong</p>
          <p>Point</p>
        </div>

        <div className="score-row">
          <p className="text-left text-xl">General Knowledge</p>
          <p>{correctGeneralAnswersCount}</p>
          <p>{incorrectGeneralAnswersCount}</p>
          <p>+ {correctGeneralAnswersCount * (100 / 15).toFixed(0)}</p>
        </div>

        <div className="score-row">
          <p className="text-left text-xl">Mathematics</p>
          <p>{correctMathAnswersCount}</p>
          <p>{incorrectMathAnswersCount}</p>
          <p>+ {(correctMathAnswersCount * (100 / 15)).toFixed(0)}</p>
        </div>
        <div className="score-row">
          <p className="text-left text-xl">Computer Technology</p>
          <p>{correcTechnologyAnswersCount}</p>
          <p>{incorrecTechnologyAnswersCount}</p>
          <p>+ {(correcTechnologyAnswersCount * (100 / 15)).toFixed(0)}</p>
        </div>
      </div>
      <hr className="mt-4 mb-3 h-px border-0 bg-gray-400 dark:bg-gray-600" />
      <span className="mr-9 flex justify-between text-lg font-semibold uppercase lg:text-2xl text-red-600">
        Total points <span>{totalPoint}</span>
      </span>
      {totalPoint >= 40 ? (
        <p className="mt-6 text-center sm:text-lg font-medium uppercase text-pink-400">
        Congratulations on passing our entrance test, we will contact you with the results as well as the next round of interviews.
      </p>
      ) : (
        <p className="mt-6 text-center sm:text-lg font-medium uppercase text-pink-400">
          Thank you for doing our test!
        </p>
      )}
    </div>
  );
}
