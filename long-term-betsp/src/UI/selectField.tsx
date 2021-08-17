// let Debaters: string[] = [];
let debaters = ["Anton", "Olga", "Kira"];
let status = ["in progress", "overdue", "finished"];

interface SelectFieldProps {
  labelValue: string;
  htmlFor: string;
  options: string[];
}

const SelectField = ({ labelValue, htmlFor, options }: SelectFieldProps) => {
  return (
    <div>
      <label htmlFor={htmlFor} style={{ color: "white" }}>
        {labelValue}
      </label>
      <div className="nes-select is-dark">
        <select defaultValue="" required id={htmlFor}>
          <option value="">Select...</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export { debaters, status, SelectField };
