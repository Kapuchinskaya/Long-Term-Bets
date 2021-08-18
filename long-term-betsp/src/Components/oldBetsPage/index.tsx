import { debaters } from "../../UI/selectField";
import { bets } from "../../Resources/dataBets";

const winner = "Kira";

const OldBetsPage = () => {
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
        <table className="nes-table is-bordered is-dark">
          <thead>
            <tr>
              <th>WHO bets</th>
              <th>WHO</th>
              <th>that</th>
              <th>till</th>
              <th>status</th>
              <th>winner</th>
            </tr>
          </thead>
          <tbody>
            {bets.map((bet, index) => (
              <tr key={index}>
                <th className="middle-cell">{bet.whoFirst}</th>
                <th className="middle-cell">{bet.whoSecond}</th>
                <th className="big-cell">{bet.topic}</th>
                <th className="middle-cell">{bet.date}</th>
                <th className={`${bet.status} middle-cell  `}>{bet.status}</th>
                <th className="middle-cell">{bet.winner}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OldBetsPage;
