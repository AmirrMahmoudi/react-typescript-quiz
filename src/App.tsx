import { Box, Flex, Image, Spinner } from "@chakra-ui/react";
import logoImg from "./assets/logo.png";
import bubbleImg from "./assets/bubble.png";
import "../global.css";
import { useEffect, useState } from "react";
import SetQuestionQty from "./features/SetQuestionQty";
import {
  FetchQuizParams,
  QuizCategory,
  QuizDifficulty,
  QuizItem,
  QuizType,
} from "./types/quiz-type";
import SetQuestionCategory from "./features/SetQuestionCategory";
import { QuizAPI } from "./api/quiz-api";
import SetQuizDifficulty from "./features/SetQuizDifficulty";
import PlayQuiz from "./features/PlayQuiz/PlayQuiz";
import Score from "./features/Score";

enum Step {
  Loading,
  SetQuestionQty,
  SetQuestionCategory,
  SetQuestionDifficulty,
  Play,
  Score,
}

// axios.get("https://trivial", { params: { amount: 2, category: "science" } });

const App = () => {
  const [step, setStep] = useState<Step>(Step.Loading);
  const [quizParams, setQuizParams] = useState<FetchQuizParams>({
    amount: 0,
    category: "",
    difficulty: QuizDifficulty.Mixed,
    type: QuizType.Multiple,
  });

  const [categories, setCategories] = useState<QuizCategory[]>([]);
  const [quiz, setQuiz] = useState<QuizItem[]>([]);
  const [history, setHistory] = useState<boolean[]>([]);
  console.log("***", quizParams);

  useEffect(() => {
    (async () => {
      setCategories([
        { id: -1, name: "Mixed" },
        ...(await QuizAPI.fetchCategories()),
      ]);
      setStep(Step.SetQuestionQty);
    })();
  }, []);
  const header = (
    <Flex justify={"center"}>
      <Image h="24" src={logoImg} />
    </Flex>
  );

  const renderScreenByStep = () => {
    switch (step) {
      case Step.Loading:
        return (
          <Flex
            position={"absolute"}
            justify={"center"}
            alignItems={"center"}
            minH={"100vh"}
            width={"100%"}
          >
            <Spinner />
          </Flex>
        );

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
        return (
          <SetQuizDifficulty
            onClickNext={async (difficulty: QuizDifficulty) => {
              const params = {
                ...quizParams,
                difficulty,
              };
              setQuizParams(params);
              const quizResp = await QuizAPI.fetchQuiz(params);
              if (quizResp.length > 0) {
                setQuiz(quizResp);
                setStep(Step.Play);
              } else {
                alert(
                  `Couldn't find ${params.amount} questions for this category, restarting game`
                );
                setStep(Step.SetQuestionQty);
              }
            }}
          />
        );

      case Step.Play:
        return (
          <PlayQuiz
            onFinished={(history_: boolean[]) => {
              setHistory(history_);
              setStep(Step.Score);
            }}
            quiz={quiz}
          />
        );
      case Step.Score:
        return (
          <Score
            history={history}
            onNext={() => {
              setStep(Step.SetQuestionQty);
            }}
          />
        );
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
