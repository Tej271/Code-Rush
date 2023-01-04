import React, { useState } from "react";

const TriviaQuestion = [
  {
    question: "What is the last name of Johnny, Moira, David, and Alexis?",
    answer: "Rose",
    headingID: "item-1-header",
    answerID: "item-1-answer",
  },
  {
    question: "David is played by what actor? ",
    answer: "Dan Levy",
    headingID: "item-2-header",
    answerID: "item-2-answer",
  },
  {
    question: "What is the name of the motel Johnny Rose owns? ",
    answer: "Rosebud Motel",
    headingID: "item-3-header",
    answerID: "item-3-answer",
  },
  {
    question:
      "How much money did Johnny Rose invest in his video rental business initially?",
    answer: "$2,000",
    headingID: "item-4-header",
    answerID: "item-4-answer",
  },
  {
    question:
      "What's the name of the soap opera that Moira Rose is best known for?",
    answer: "Sunrise Bay",
    headingID: "item-5-header",
    answerID: "item-5-answer",
  },
];

const Trivia = () => {
  const [isClicked, setIsClicked] = useState(null);
  const revealAnswer = (index) => {
    if (index === isClicked) {
      return setIsClicked(null);
    }
    setIsClicked(index);
  };

  const toggleBtn = (index) => {
    if (index === isClicked) {
      return "-";
    } else {
      return "+";
    }
  };

  const screenReaderInstructions = (trivia, index) => {
    if (index === TriviaQuestion.length - 2 && index === isClicked) {
      return trivia.answer + "... Press tab to hear the final question.";
    } else if (index === isClicked) {
      return trivia.answer + "... Press tab to hear the next question.";
    } else {
      return trivia.question + "... Press enter to reveal the answer.";
    }
  };

  const accordionClosed =
    "hidden rounded-2xl overflow-y-hidden max-w-6xl leading-snug opacity-0";
  const accordionOpen =
    "block max-h-[400px] overflow-y-visible opacity-100 mr-auto";

  return (
    <>
      <section id="trivia" className="px-2 pt-10">
        {TriviaQuestion.map((trivia, index) => (
          <div
            key={trivia.question}
            className="flex flex-col items-center max-w-3xl px-5 py-2 mx-auto my-5 shadow-lg gap-x-5 dark:shadow-none dark:border dark:border-slate-200 rounded-2xl"
          >
            <div className="flex items-center justify-between w-full py-5 cursor-pointer">
              <h3>
                <button
                  className="font-medium text-accordion-question leading-relaxed font-nunito w-full text-left pr-5"
                  id={trivia.headingID}
                  aria-label={screenReaderInstructions(trivia, index)}
                  aria-expanded={isClicked === index ? "true" : false}
                  aria-controls={trivia.answerID}
                  onClick={() => revealAnswer(index)}
                >
                  {trivia.question}
                </button>
              </h3>
              <span>{toggleBtn(index)}</span>
            </div>

            {
              <section
                id={trivia.answerID}
                aria-labelledby={trivia.headingID}
                className={
                  isClicked === index ? accordionOpen : accordionClosed
                }
              >
                <p className="font-normal text-accordion-answer">
                  {trivia.answer}
                </p>
              </section>
            }
          </div>
        ))}
      </section>
    </>
  );
};
export default Trivia;
