import { debaters, SelectField } from "../../UI/selectField";
import { ButtonTypes } from "../../UI/submitButton";

const BetPage = (): JSX.Element => {
  const saveToBase = () => {
    console.log("check");
  };

  return (
    <div className="page-wrapper">
      <div className="row-wrapper">
        <SelectField htmlFor="first-who" labelValue="WHO" options={debaters} />
        <h3>bets</h3>
        <SelectField htmlFor="second-who" labelValue="WHO" options={debaters} />
      </div>
      <div className="row-wrapper">
        <label htmlFor="dark_field" className="label-for-input">
          that
        </label>
        <textarea id="dark_field" className="nes-input is-dark"></textarea>
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
        />
      </div>
      <div className="row-wrapper">
        <button
          type="button"
          className={ButtonTypes.Success}
          onClick={saveToBase}
        >
          save
        </button>
      </div>
    </div>
  );
};
export default BetPage;
