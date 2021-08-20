import { SelectField } from "../../UI/selectField";
import { ButtonTypes } from "../../UI/submitButton";

import { ChangeEvent, useState } from "react";
import { debaters } from "../../Resources/dataBets";
import { betsCollection } from "../../firebase";

const BetPage = (): JSX.Element => {
  const [whoFirst, setWhoFirst] = useState("");
  const [whoSecond, setWhoSecond] = useState("");
  const [topic, setTopic] = useState("");
  const [dateBet, setDate] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const isValid = errors.length === 0;

  const getFilteredDebaters = (selectedDebater: string) => {
    const filtered = debaters.filter((debater) => debater !== selectedDebater);
    return filtered;
  };

  const onWhoFirstChange = (value: string) => {
    setWhoFirst(value);
  };
  const onWhoSecondChange = (value: string) => {
    setWhoSecond(value);
  };

  const onTopicChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTopic(event.target.value);
  };

  const onDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const onClear = () => {
    setWhoFirst("");
    setWhoSecond("");
    setTopic("");
    setDate("");
  };

  const validateWho = (who: string, name: string) => {
    if (!debaters.includes(who)) {
      return `Who-who? - select the ${name} debator :)`;
    }
  };

  const validateTopic = (topic: string) => {
    if (topic.length < 10) {
      return "Min 10 symbols - you are too laconic :)";
    }
    if (topic.length > 200) {
      return "Max 200 symbos - you should be more precise :)";
    }
  };

  const validateDate = (date: string) => {
    let today = new Date();
    if (date === "") return "When will we celebrate? - choose the date :)";
    if (Date.parse(date) <= today.getTime())
      return "You'd already know that! - choose the future date :)";
  };

  const validateNewBet = (element: Bet) => {
    const newErrors: string[] = [];

    const validatedWhoFirst = validateWho(element.whoFirst, "first");
    if (validatedWhoFirst) newErrors.push(validatedWhoFirst);

    const validatedWhoSecond = validateWho(element.whoSecond, "second");
    if (validatedWhoSecond) newErrors.push(validatedWhoSecond);

    const validatedTopic = validateTopic(element.topic);
    if (validatedTopic) newErrors.push(validatedTopic);

    const validatedDate = validateDate(element.dateBet);
    if (validatedDate) newErrors.push(validatedDate);

    return newErrors;
  };

  const showErrorMessages = () => {
    return (
      <div className="error-messages-wrapper">
        {errors.map((error: string, index: number) => (
          <p key={index}>{error}</p>
        ))}
      </div>
    );
  };

  interface Bet {
    whoFirst: string;
    whoSecond: string;
    topic: string;
    dateBet: string;
    status: string;
    winner: string;
  }
  const onSave = () => {
    const newBet: Bet = {
      whoFirst,
      whoSecond,
      topic,
      dateBet,
      status: "active",
      winner: "---",
    };

    const newErrors = validateNewBet(newBet);

    if (newErrors.length === 0) {
      onClear();
      setErrors([]);
      try {
        betsCollection.add(newBet);
      } catch (error) {
        console.log(error);
      }

      return newBet;
    }

    setErrors(newErrors);
  };

  return (
    <div className="page-wrapper">
      <div className="row-wrapper">
        <SelectField
          htmlFor="first-who"
          labelValue="WHO"
          value={whoFirst}
          options={getFilteredDebaters(whoSecond)}
          onChange={onWhoFirstChange}
        />
        <h3>bets</h3>
        <SelectField
          htmlFor="second-who"
          labelValue="WHO"
          value={whoSecond}
          options={getFilteredDebaters(whoFirst)}
          onChange={onWhoSecondChange}
        />
      </div>
      <div className="row-wrapper">
        <label htmlFor="dark_field" className="label-for-input">
          that
        </label>
        <textarea
          id="dark_field"
          className="nes-input is-dark"
          value={topic}
          onChange={onTopicChange}
          placeholder="what's your bet?"
        ></textarea>
      </div>
      <div className="row-wrapper">
        <label htmlFor="dark-date" className="label-for-input">
          till
        </label>
        <input
          type="date"
          id="dark-date"
          className="nes-input is-dark"
          placeholder="dark.css"
          value={dateBet}
          onChange={onDateChange}
        />
      </div>
      <div className="row-wrapper">
        <button type="submit" className={ButtonTypes.Success} onClick={onSave}>
          save
        </button>
      </div>
      {!isValid ? showErrorMessages() : null}
    </div>
  );
};
export default BetPage;
