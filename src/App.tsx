import { Box, Flex, Image } from "@chakra-ui/react";
import logoImg from "./assets/logo.png";
import bubbleImg from "./assets/bubble.png";
import "../global.css";
import { useState } from "react";
import SetQuestionQty from "./features/SetQuestionQty";
import axios from "axios";

enum Step {
  SetQuestionQty,
  SetQuestionCategory,
  SetQuestionDiffculty,
  Play,
  Score,
}

axios.get("https://trivial", { params: { amount: 2, category: "science" } });

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
        return <SetQuestionQty defaultValue={10} max={30} min={5} step={5} />;
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
      <Box mt={100}>{renderScreenByStep()}</Box>
    </Box>
  );
};

export default App;
