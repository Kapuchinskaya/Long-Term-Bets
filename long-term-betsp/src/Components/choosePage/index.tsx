import { ButtonTypes, SubmitButton } from "../../UI/submitButton";

interface ChoosePageProps {
  toScroll: (element: string | undefined) => void;
}

const ChoosePage = ({ toScroll }: ChoosePageProps): JSX.Element => {
  return (
    <div className="page-wrapper">
      <div className="row-wrapper">
        <i className="nes-icon coin is-large"></i>
        <h1>long term bets</h1>
      </div>
      <div className="row-wrapper">
        <h2>You wanna</h2>
        <SubmitButton
          text="BET?"
          styleName={`${ButtonTypes.Error + " home-page-btn"}`}
          onClick={toScroll}
          element="newBetPage"
        />
        <h2>or</h2>
        <SubmitButton
          text="CHECK BETS?"
          styleName={`${ButtonTypes.Primary + " home-page-btn"}`}
          onClick={toScroll}
          element="oldBetsPage"
        />
      </div>
    </div>
  );
};

export default ChoosePage;
