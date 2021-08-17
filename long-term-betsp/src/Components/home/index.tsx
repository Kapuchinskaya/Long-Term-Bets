import { ButtonTypes, submitButton } from "./../../UI/submitButton";
import logo from "../../Resources/images/money.jpg";
const HomePage = (): JSX.Element => {
  return (
    <div className="page-wrapper">
      <div className="home-page-row-wrapper">
        <img src={logo}></img>
        <h1>long term bets</h1>
      </div>

      <div className="home-page-row-wrapper">
        <h2>You wanna</h2>
        {submitButton("Bet?", `${ButtonTypes.Error + " home-page-btn"}`)}
        <h2>or</h2>
        {submitButton(
          "Check Bets?",
          `${ButtonTypes.Primary + " home-page-btn"}`
        )}
      </div>
    </div>
  );
};
export default HomePage;
