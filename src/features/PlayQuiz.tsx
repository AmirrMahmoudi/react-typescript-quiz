import { QuizItem } from "../types/quiz-type";

const PlayQuiz = (p: { quiz: QuizItem[] }) => {
  console.log(p.quiz);
  return <>Play</>;
};

export default PlayQuiz;
