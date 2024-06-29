import { useState } from "react";
import { QuizItem } from "../types/quiz-type";
import {
  Flex,
  Heading,
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

const PlayQuiz = (p: { quiz: QuizItem[] }) => {
  const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0);
  const currentQuizItem: QuizItem = p.quiz[currentQuizItemIndex];

  const availableAnswers: string[] = [
    currentQuizItem.correct_answer,
    ...currentQuizItem.incorrect_answers,
  ];
  const radioList = availableAnswers.map((availableAnswer: string) => (
    <Radio key={availableAnswer} value={availableAnswer}>
      <Text dangerouslySetInnerHTML={{ __html: availableAnswer }}></Text>
    </Radio>
  ));

  return (
    <Flex direction={"column"} alignItems={"center"} justify={"center"}>
      <Heading
        fontSize={"3xl"}
        mt={100}
        mb={20}
        dangerouslySetInnerHTML={{ __html: currentQuizItem.question }}
      />

      <RadioGroup
        value={""}
        onChange={() => setCurrentQuizItemIndex(currentQuizItemIndex + 1)}
      >
        <SimpleGrid columns={2} spacing={4}>
          {radioList}
        </SimpleGrid>
      </RadioGroup>
    </Flex>
  );
};

export default PlayQuiz;
