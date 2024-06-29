import { Button, Flex, Heading, Text } from "@chakra-ui/react";

const Score = (p: { history: boolean[]; onNext: () => void }) => {
  const rightAnswers = p.history.filter(
    (isValidAnswer: boolean) => isValidAnswer === true
  ).length;

  const renderMessage = () => {
    const rightAnswerPercentage = (rightAnswers * 100) / p.history.length;
    if (rightAnswerPercentage < 30) {
      return "You need more practice";
    } else if (rightAnswerPercentage < 50) {
      return "Not bad ! Keep training you'r getting better";
    } else if (rightAnswerPercentage < 75) {
      return "Good job!";
    } else {
      return "Whoah ! You did amazing !";
    }
  };
  return (
    <Flex direction={"column"} alignItems={"center"}>
      <Heading fontSize={"3xl"}>Score</Heading>
      <Heading fontSize={"xl"} mt={"5"}>
        {rightAnswers}/{p.history.length}
      </Heading>
      <Text fontWeight={"bold"} mt={20}>
        {renderMessage()}
      </Text>
      <Button
        position={"absolute"}
        top={"80%"}
        right={"10%"}
        onClick={p.onNext}
      >
        New Game
      </Button>
    </Flex>
  );
};

export default Score;
