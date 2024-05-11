import { ChangeEventHandler } from "react";

function InputBox({
  label,
  onChange,
  type,
  placeholder,
  readonly,
}: {
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type: string;
  placeholder: string;
  readonly: boolean;
}) {
  return (
    <div className="text-start space-y-2">
      <h1 className="font-medium text-lg">{label}</h1>
      <input
        className="rounded-md border w-80 p-2 "
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        readOnly={readonly}
      />
    </div>
  );
}

export default InputBox;
