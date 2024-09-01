import { useNavigate } from "react-router-dom";
import Button from "./Button";
import ProfileIcon from "./ProfileIcon";

function Usercard({
  firstName,
  lastName,
  to,
}: {
  firstName: string;
  lastName: string;
  to: string;
}) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between px-4 py-3 shadow-xl rounded-md">
      <div className="w-fit h-fit scale-90 flex items-center gap-x-4">
        <ProfileIcon firstName={firstName} />
        <h1 className="text-lg font-semibold">
          {firstName + " "}
          {lastName}
        </h1>
      </div>
      <div className="w-1/12 text-sm">
        <Button
          label="Send Money"
          onClick={() =>
            navigate(
              `/transfer?to=${to}&firstName=${firstName}&lastName=${lastName}`
            )
          }
        />
      </div>
    </div>
  );
}

export default Usercard;
