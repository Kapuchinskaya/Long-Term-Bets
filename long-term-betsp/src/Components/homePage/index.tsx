import { ButtonTypes, SubmitButton } from "../../UI/submitButton";
import { scroller } from "react-scroll";
import BetPage from "../newBetPage";
import { Element } from "react-scroll";
import OldBetsPage from "../oldBetsPage";

const HomePage = (): JSX.Element => {
  const scrollToElement = (element: string | undefined) => {
    if (!element) return;
    scroller.scrollTo(element, {
      duration: 500,
      delay: 100,
      smooth: true,
      offset: 0,
    });
  };

  return (
    <div>
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
            onClick={scrollToElement}
            element="newBetPage"
          />
          <h2>or</h2>
          <SubmitButton
            text="CHECK BETS?"
            styleName={`${ButtonTypes.Primary + " home-page-btn"}`}
            onClick={scrollToElement}
            element="oldBetsPage"
          />
        </div>
      </div>
      <Element name="newBetPage">
        <BetPage />
      </Element>
      <Element name="oldBetsPage">
        <OldBetsPage />
      </Element>
    </div>
  );
};
export default HomePage;
