import { scroller } from "react-scroll";
import BetPage from "../newBetPage";
import { Element } from "react-scroll";
import {OldBetsPage} from "../oldBetsPage";
import ChoosePage from "../choosePage";
import { betsCollection } from "../../firebase";
import { useEffect, useState } from "react";

interface Bet {
  id: string;
  whoFirst: string;
  whoSecond: string;
  topic: string;
  dateBet: string;
  status: string;
  winner: string;
}

const HomePage = (): JSX.Element => {
  const [betsFromBase, setBetsFromBase] = useState<Bet[]>([]);

  useEffect(() => {
    getBetsSnapshot();
  }, []);

  const getBetsSnapshot = async () => {
    debugger;
    try {
      const snapshot = await betsCollection.get();
      // if (snapshot && snapshot.docs.length === 0) {
      //   return;
      // }

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

  const updateBetsFromBase = (bets: Bet[]) => {
    setBetsFromBase(bets);
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

  return (
    <div>
      <ChoosePage toScroll={scrollToElement} />
      <Element name="newBetPage">
        <BetPage getBetsSnapshot={getBetsSnapshot} />
      </Element>
      <Element name="oldBetsPage">
        <OldBetsPage
          getBetsSnapshot={getBetsSnapshot}
          betsFromBase={betsFromBase}
          updateBetsFromBase={updateBetsFromBase}
        />
      </Element>
    </div>
  );
};
export { HomePage };
export type { Bet };
