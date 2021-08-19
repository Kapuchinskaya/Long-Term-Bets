import { debaters } from "../../UI/selectField";
import { scroller } from "react-scroll";
import { bets } from "../../Resources/dataBets";
import { useState } from "react";
import { ButtonTypes, SubmitButton } from "../../UI/submitButton";

const winner = "Kira";

const OldBetsPage = () => {
  const [betsToShow, setBetsToShow] = useState(bets);
  const [isUpdated, setIsUpdated] = useState(false);

  const scrollToElement = (element: string | undefined) => {
    if (!element) return;
    scroller.scrollTo(element, {
      duration: 500,
      delay: 100,
      smooth: true,
      offset: 0,
    });
  };

  const handleDelete = (index: number) => {
    const betsToUpdate = [...betsToShow];
    betsToUpdate.splice(index, 1);
    setBetsToShow(betsToUpdate);
  };

  const handleUpdate = (index: number) => {
    console.log(index);
  };

  return (
    <div className="page-wrapper">
      <div className="row-wrapper">
        <h3>SCORE</h3>
        {debaters.map((debater, index) => (
          <div
            key={index}
            className={debater === winner ? "score-item winner" : "score-item"}
          >
            <p>{`${debater} : ${index}`}</p>
          </div>
        ))}
      </div>
      <div className="nes-table-responsive">
        {betsToShow.length === 0 ? (
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
              {betsToShow.map((bet, index) => (
                <tr key={index}>
                  <th className="middle-cell">{bet.whoFirst}</th>
                  <th className="middle-cell">{bet.whoSecond}</th>
                  <th className="big-cell">{bet.topic}</th>
                  <th className="middle-cell">{bet.date}</th>
                  <th className={`${bet.status} middle-cell  `}>
                    {bet.status}
                  </th>
                  <th className="middle-cell">{bet.winner}</th>
                  <th>
                    <button
                      type="button"
                      className="nes-btn"
                      onClick={() => handleUpdate(index)}
                    >
                      update
                    </button>
                    <button
                      type="button"
                      className="nes-btn is-error"
                      onClick={() => handleDelete(index)}
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
