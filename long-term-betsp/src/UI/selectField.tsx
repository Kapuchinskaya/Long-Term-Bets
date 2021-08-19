// let Debaters: string[] = [];
let debaters = ["Anton", "Olga", "Kira"];
let status = ["in progress", "overdue", "finished"];

interface SelectFieldProps {
  labelValue: string;
  htmlFor: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const SelectField = ({
  labelValue,
  htmlFor,
  value,
  options,
  onChange,
}: SelectFieldProps) => {
  return (
    <div>
      <label htmlFor={htmlFor} style={{ color: "white" }}>
        {labelValue}
      </label>
      <div className="nes-select is-dark">
        <select
          value={value}
          required
          id={htmlFor}
          onChange={(event) => onChange(event.target.value)}
        >
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
