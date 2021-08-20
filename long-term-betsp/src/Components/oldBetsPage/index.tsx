import { scroller } from "react-scroll";
import { debaters } from "../../Resources/dataBets";
import { useEffect, useState } from "react";
import { ButtonTypes, SubmitButton } from "../../UI/submitButton";
import { statusTypes } from "../../Resources/dataBets";
import { betsCollection } from "../../firebase";

interface Bet {
  id: string;
  whoFirst: string;
  whoSecond: string;
  topic: string;
  dateBet: string;
  status: string;
  winner: string;
}

interface Score {
  debater: string;
  result: number;
}

const OldBetsPage = () => {
  const [updatedIndex, setUpdatedIndex] = useState<string | undefined>(
    undefined
  );
  const [betsFromBase, setBetsFromBase] = useState<Bet[]>([]);
  // const [scores, setScore] = useState<Score[]>([]);

  useEffect(() => {
    getBetsSnapshot();
  }, []);

  const getBetsSnapshot = async () => {
    try {
      const snapshot = await betsCollection.get();
      if (snapshot && snapshot.docs.length === 0) {
        return;
      }

      const betsFromBase: Bet[] = snapshot.docs.map((doc) => {
        const { whoFirst, whoSecond, topic, dateBet, status, winner } =
          doc.data();

        return {
          id: doc.id,
          whoFirst,
          whoSecond,
          topic,
          dateBet,
          status,
          winner,
        };
      });
      setBetsFromBase(betsFromBase);
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToElement = (element: string | undefined) => {
    if (!element) return;
    scroller.scrollTo(element, {
      duration: 500,
      delay: 100,
      smooth: true,
      offset: 0,
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await betsCollection.doc(id).delete();
      await getBetsSnapshot();
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusCell = (bet: Bet) => {
    return bet.id === updatedIndex ? (
      <th>
        <div className="nes-select is-dark">
          <select
            value={bet.status}
            onChange={(event) => handleStatusChange(event.target.value, bet)}
          >
            {statusTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </th>
    ) : (
      <th className={`${bet.status} middle-cell`}>{bet.status}</th>
    );
  };

  const handleStatusChange = (value: string, bet: Bet) => {
    const copiedBetsFromBase = [...betsFromBase];
    const updatedStatusBet = copiedBetsFromBase.find(
      (betFromBase) => betFromBase.id === bet.id
    );
    if (updatedStatusBet) {
      updatedStatusBet.status = value;
    }
    setBetsFromBase(copiedBetsFromBase);
  };

  const getWinnerCell = (bet: Bet) => {
    if (bet.id === updatedIndex && bet.status === "finished") {
      return (
        <th className="middle-cell">
          <div className="nes-select is-dark">
            <select
              value={bet.winner}
              onChange={(event) => handleWinnerChange(event.target.value, bet)}
            >
              {debaters.map((debater) => (
                <option key={debater} value={debater}>
                  {debater}
                </option>
              ))}
            </select>
          </div>
        </th>
      );
    }

    if (bet.status === "finished") {
      return <th className="middle-cell">{bet.winner}</th>;
    }

    return <th className="middle-cell">---</th>;
  };

  const handleWinnerChange = (value: string, bet: Bet) => {
    const copiedBetsFromBase = [...betsFromBase];
    const updatedWinnerBet = copiedBetsFromBase.find(
      (betFromBase) => betFromBase.id === bet.id
    );
    if (updatedWinnerBet) {
      updatedWinnerBet.winner = value;
    }
    setBetsFromBase(copiedBetsFromBase);
  };

  const getButtonsCell = (bet: Bet) => {
    return bet.id === updatedIndex ? (
      <button
        type="submit"
        className={ButtonTypes.Success}
        onClick={() => onSaveUpdate(bet)}
      >
        save
      </button>
    ) : (
      <button
        type="button"
        className="nes-btn"
        onClick={() => setUpdatedIndex(bet.id)}
      >
        update
      </button>
    );
  };

  const onSaveUpdate = async (bet: Bet) => {
    try {
      await betsCollection.doc(bet.id).update(bet);
    } catch (error) {
      console.log(error);
    }
    setUpdatedIndex(undefined);
  };

  const getScores = () => {
    const scores: Score[] = [];

    debaters.forEach((debater) => {
      const result = betsFromBase.filter(
        (bet) => bet.winner === debater
      ).length;
      scores.push({ debater, result } as Score);
    });

    return scores;
  };

  return (
    <div className="page-wrapper">
      <div className="row-wrapper">
        <h3>SCORE</h3>

        {getScores().map((score, index) => (
          <div key={index} className={"score-item winner"}>
            <p>{`${score.debater} : ${score.result}`}</p>
          </div>
        ))}
      </div>
      <div className="nes-table-responsive">
        {betsFromBase.length === 0 ? (
          <div className="row-wrapper">
            <h2>There are no bets - create the 1st one!</h2>
            <SubmitButton
              text="BET?"
              styleName={`${ButtonTypes.Error + " home-page-btn"}`}
              onClick={scrollToElement}
              element="newBetPage"
            />
          </div>
        ) : (
          <table className="nes-table is-bordered is-dark">
            <thead>
              <tr>
                <th>WHO bets</th>
                <th>WHO</th>
                <th>that</th>
                <th>till</th>
                <th>status</th>
                <th>winner</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {betsFromBase.map((bet) => (
                <tr key={bet.id}>
                  <th className="middle-cell">{bet.whoFirst}</th>
                  <th className="middle-cell">{bet.whoSecond}</th>
                  <th className="big-cell">{bet.topic}</th>
                  <th className="middle-cell">{bet.dateBet}</th>
                  {getStatusCell(bet)}
                  {getWinnerCell(bet)}
                  <th>
                    {getButtonsCell(bet)}
                    <button
                      type="button"
                      className="nes-btn is-error"
                      onClick={() => handleDelete(bet.id)}
                    >
                      delete
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OldBetsPage;
