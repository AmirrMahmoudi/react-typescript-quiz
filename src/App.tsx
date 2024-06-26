import { Box, Flex, Image } from "@chakra-ui/react";
import logoImg from "./assets/logo.png";
import bubbleImg from "./assets/bubble.png";
import "../global.css";
import { useState } from "react";
import SetQuestionQty from "./features/SetQuestionQty";

enum Step {
  SetQuestionQty,
  SetQuestionCategory,
  SetQuestionDiffculty,
  Play,
  Score,
}
const App = () => {
  const [step, setStep] = useState<Step>(Step.SetQuestionQty);

  const header = (
    <Flex justify={"center"}>
      <Image h="24" src={logoImg} />
    </Flex>
  );

  const renderScreenByStep = () => {
    switch (step) {
      case Step.SetQuestionQty:
        return <SetQuestionQty />;
      case Step.SetQuestionCategory:
        return <></>;
      case Step.SetQuestionDiffculty:
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
      <Box> {renderScreenByStep()} </Box>
    </Box>
  );
};

export default App;
