import { useState } from "react";
import { answerColors, victorinaData } from "./data";
import victorinaImage from "./assets/python.jpg";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answerI, setAnswerI] = useState(0);
  const [points, setPoints] = useState(0);
  const [isPassed, setIsPassed] = useState(false);
  const currentQuestion = victorinaData[questionIndex];
  const isExamGood = (victorinaData.length * 10) / 2 < points;

  const answerFunc = (answerI: number) => {
    setAnswerI(answerI);
    answerI === currentQuestion.correctAnswer && setPoints((prev) => prev + 10);

    setTimeout(() => {
      setAnswerI(0);
      if (questionIndex + 1 < victorinaData.length)
        setQuestionIndex((prev) => prev + 1);
      else setIsPassed(true);

      window.scrollTo({
        top: 0,
      });
    }, 1000);
  };

  if (!isStarted)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center gap-[240px]">
        <div className="font-extrabold">
          <span className="text-[24px]">Викторина по теме:</span>
          <h1 className="text-[32px]">Python и Django</h1>
        </div>
        <button
          onClick={() => setIsStarted(true)}
          className="rounded-[28px] px-[68px] bg-white text-[#222] text-[64px] leading-normal font-extrabold"
        >
          Go
        </button>
      </div>
    );
  else if (isPassed)
    return (
      <div className="h-screen">
        <div
          style={{ backgroundColor: isExamGood ? "#40AE25" : "#E82222" }}
          className="pt-[60px] h-[50%] text-center font-extrabold"
        >
          <h2 className="text-[48px]">
            {isExamGood ? "Подравляю!" : "Неудача"}
          </h2>
          <span className="text-[32px]">Твой общий балл</span>
          <div
            style={{
              borderColor: isExamGood ? "#8F00FF" : "#4A4A4A",
              boxShadow: isExamGood
                ? "3px 4px 91.5px 0px rgba(66, 0, 255, 0.54)"
                : "",
            }}
            className="absolute top-[calc(50%-124px)] left-[calc(50%-124px)] rounded-[50%] border-[12px] flex justify-center items-center w-[248px] h-[248px] bg-[#121212] text-[64px]"
          >
            {points}
          </div>
        </div>
      </div>
    );
  else
    return (
      <div>
        {/* <div className="h-[80px] bg-[#121212]"></div> */}
        <h2 className="pt-[27px] pb-[19px] px-[10px] font-bold text-[32px] text-center uppercase">
          {currentQuestion.question}
        </h2>
        <div
          style={{ backgroundImage: `url(${victorinaImage})` }}
          className="h-[340px] bg-cover bg-center bg-no-repeat flex items-end"
        >
          <div className="rounded-[25px_25px_0_0] w-full h-[50px] bg-blend-soft-light backdrop-blur-[6px]"></div>
        </div>
        {currentQuestion.answers.map((answer, key) => (
          <button
            key={key}
            disabled={!!answerI}
            onClick={() => answerFunc(key + 1)}
            style={{
              backgroundColor: answerI
                ? answerI - 1 === key
                  ? answerI === currentQuestion.correctAnswer
                    ? "#FF6B00"
                    : "#930BD2"
                  : key + 1 === currentQuestion.correctAnswer
                  ? "#FF6B00"
                  : "#757470"
                : answerColors[key],
            }}
            className="relative py-[20px] px-[11px] w-full flex items-center gap-[10px] text-[15px] text-start font-bold"
          >
            <div
              style={{
                backgroundColor: answerI
                  ? answerI - 1 === key
                    ? answerI === currentQuestion.correctAnswer
                      ? "#33FF00"
                      : "#DD0808"
                    : key + 1 == currentQuestion.correctAnswer
                    ? "#33FF00"
                    : "white"
                  : "white",
              }}
              className="flex-[0_0_19px] h-[19px]"
            ></div>
            <span>{answer}</span>
          </button>
        ))}
        {/* <div className="h-[80px] bg-[#121212]"></div> */}
      </div>
    );
}

export default App;
