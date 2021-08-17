enum ButtonTypes {
  Normal = "nes-btn",
  Primary = "nes-btn is-primary",
  Success = "nes-btn is-success",
  Warning = "nes-btn is-warning",
  Error = "nes-btn is-error",
  Disabled = "nes-btn is-disabled",
}

const submitButton = (text: string, styleName: string): JSX.Element => {
  return (
    <button type="button" className={styleName}>
      {text}
    </button>
  );
};
export { ButtonTypes, submitButton };
