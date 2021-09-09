import { Score } from ".";
import { winners } from "../../Resources/dataBets";
import { Bet } from "../homePage";

interface headingProps {
  betsFromBase: Bet[];
}

const Heading = ({ betsFromBase }: headingProps) => {
  const getScores = () => {
    const scores: Score[] = [];

    winners.forEach((winner) => {
      const result = betsFromBase
        .filter((bet) => bet.status === "finished")
        .filter((bet) => bet.winner === winner).length;
      winner === "---"
        ? scores.push({ winner: "no winner", result } as Score)
        : scores.push({ winner, result } as Score);
    });
    console.log(scores);
    return scores;
  };

  return (
    <div className="row-wrapper">
      <h3>SCORE</h3>

      {getScores().map((score, index) => (
        <div key={index} className={"score-item winner"}>
          <p>{`${score.winner} : ${score.result}`}</p>
        </div>
      ))}
    </div>
  );
};

export default Heading;
