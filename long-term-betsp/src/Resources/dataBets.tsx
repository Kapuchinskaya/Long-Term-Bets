enum StatusTypes {
  Active = "active",
  Finished = "finished",
}

class Bet {
  constructor(
    public whoFirst: string,
    public whoSecond: string,
    public topic: string,
    public date: string,
    public status: string,
    public winner: string
  ) {}
}

let bets: Bet[] = [];

const betOne = new Bet(
  "Anton",
  "Ola",
  "That she won't get hired",
  "Jan 2021",
  "active",
  "---"
);

const betTwo = new Bet(
  "Anton",
  "Kira",
  "That she will learn reading",
  "Jan 2021",
  "finished",
  "Kira"
);
const betThree = new Bet(
  "Anton",
  "Kira",
  "That she will learn reading",
  "Jan 2021",
  "active",
  "---"
);

bets.push(betOne);
bets.push(betTwo);
bets.push(betThree);
export { StatusTypes, Bet, bets };
