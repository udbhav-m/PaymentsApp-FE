import { ChangeEvent } from "react";
import Button from "./Button";
import InputBox from "./InputBox";

function Pin({
  handleOnChange,
  handleOnclick,
  onCancel,
}: {
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleOnclick: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="w-fit p-8 bg-white space-y-2 h-fit rounded-md flex flex-col gap-3 ">
      <InputBox
        label="Confirm your PIN"
        placeholder="PIN"
        type="password"
        onChange={handleOnChange}
        readonly={false}
      />
      <Button label="Proceed to pay" onClick={handleOnclick} />
      <p
        className="text-red-500 font-medium text-sm self-center cursor-pointer"
        onClick={onCancel}
      >
        Cancel
      </p>
    </div>
  );
}

export default Pin;
