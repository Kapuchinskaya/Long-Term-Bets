import { ButtonTypes, SubmitButton } from "../../UI/submitButton";
import { scroller } from "react-scroll";
import BetPage from "../newBetPage";
import { Element } from "react-scroll";
import OldBetsPage from "../oldBetsPage";
import ChoosePage from "../choosePage";

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
      <ChoosePage toScroll={scrollToElement} />
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
