import { Box, Flex, Image } from "@chakra-ui/react";
import logoImg from "./assets/logo.png";
import bubbleImg from "./assets/bubble.png";
import "../global.css";
import { useEffect, useState } from "react";
import SetQuestionQty from "./features/SetQuestionQty";
import {
  FetchQuizParams,
  QuizCategory,
  QuizDifficulty,
  QuizType,
} from "./types/quiz-type";
import SetQuestionCategory from "./features/SetQuestionCategory";
import { QuizAPI } from "./api/quiz-api";

enum Step {
  SetQuestionQty,
  SetQuestionCategory,
  SetQuestionDifficulty,
  Play,
  Score,
}

// axios.get("https://trivial", { params: { amount: 2, category: "science" } });

const App = () => {
  const [step, setStep] = useState<Step>(Step.SetQuestionQty);
  const [quizParams, setQuizParams] = useState<FetchQuizParams>({
    amount: 0,
    category: "",
    difficulty: QuizDifficulty.Mixed,
    type: QuizType.Multiple,
  });
  console.log("***", quizParams);
  const [categories, setCategories] = useState<QuizCategory[]>([]);

  useEffect(() => {
    (async () => {
      setCategories([
        { id: -1, name: "Mixed" },
        ...(await QuizAPI.fetchCategories()),
      ]);
    })();
  }, []);
  const header = (
    <Flex justify={"center"}>
      <Image h="24" src={logoImg} />
    </Flex>
  );

  const renderScreenByStep = () => {
    switch (step) {
      case Step.SetQuestionQty:
        return (
          <SetQuestionQty
            onClickNext={(amount: number) => {
              setQuizParams({ ...quizParams, amount });
              setStep(Step.SetQuestionCategory);
            }}
            defaultValue={10}
            max={30}
            min={5}
            step={5}
          />
        );
      case Step.SetQuestionCategory:
        return (
          <SetQuestionCategory
            categories={categories}
            onClickNext={(categoy: string) => {
              setQuizParams({
                ...quizParams,
                category: categoy === "-1" ? "" : categoy,
              });
              setStep(Step.SetQuestionDifficulty);
            }}
          />
        );
      case Step.SetQuestionDifficulty:
        return <></>;
      case Step.Play:
        return <></>;
      case Step.Score:
        return <></>;
      default:
        return null;
    }
  };
  return (
    <Box py={"10"} h="100%">
      {header}
      <Image
        src={bubbleImg}
        position={"absolute"}
        zIndex={-1}
        right={-120}
        top={100}
      />
      <Box mt={100}>{renderScreenByStep()}</Box>
    </Box>
  );
};

export default App;
