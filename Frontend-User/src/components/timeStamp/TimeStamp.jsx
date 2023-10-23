import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTimeByMs } from "../../utils";

const defaultCountdown = {
  minutes: "00",
  seconds: "00",
};

function TimeStamp({submitQuiz}) {
  const [countDown, setCountDown] = useState(defaultCountdown);
  const [startTime, setStartTime] = useState(true);
  const [totalTime, setTimeStamp] = useState(0);

  const navigate = useNavigate();


  useEffect(() => {
    if (!totalTime) {
      setTimeStamp(new Date(new Date().getTime() + 30 * 60000).getTime());
    }
  }, []);

  useEffect(() => {
    let intervalId;
    if (startTime && totalTime) {
      intervalId = setInterval(() => {
        const timeNext = getTimeByMs(totalTime);

        if (timeNext) {
          setCountDown(timeNext);
        } else {
          clearInterval(intervalId);
          setStartTime(false);
          submitQuiz();
          navigate("/result");
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [startTime, totalTime]);

  return (
    <>
      <div className="mx-auto flex max-w-fit items-center space-x-3 text-neutral-700 ring-[1px] ring-neutral-400 rounded-lg p-3 text-xs font-semibold">
        <span style={{fontSize: "18px"}}>{countDown.minutes}</span>
        <span style={{fontSize: "18px"}}>Minutes</span>
        <span style={{fontSize: "18px"}}>{countDown.seconds}</span>
        <span style={{fontSize: "18px"}}>Seconds</span>
      </div>
    </>
  );
}

export default TimeStamp;
