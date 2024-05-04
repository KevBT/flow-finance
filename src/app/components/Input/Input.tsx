import "./input.css";

interface ModelInput {
  label: string;
  type: string;
  value?: string;
  hidden?: boolean;
  name?: string;
  autoComplete?: string;
  readOnly?: boolean;
  onChange?: (e:React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function Input(props: ModelInput) {
  return (
    <div className="inputField">
      <input required {...props} />
      <label className={props.hidden ? "hidden" : ""}>{props.label} *</label>
    </div>
  );
}
