export enum ButtonTypes {
  Normal = "nes-btn",
  Primary = "nes-btn is-primary",
  Success = "nes-btn is-success",
  Warning = "nes-btn is-warning",
  Error = "nes-btn is-error",
  Disabled = "nes-btn is-disabled",
}

interface SubmitButtonProps {
  text: string;
  styleName: string;
  onClick: (element: string | undefined) => void;
  element?: string;
}

export const SubmitButton = ({
  text,
  styleName,
  onClick,
  element,
}: SubmitButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      className={styleName}
      onClick={() => onClick(element)}
    >
      {text}
    </button>
  );
};
