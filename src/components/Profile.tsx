import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "./ProfileIcon";
interface ProfileProps {
  firstName: string;
}
function Profile({ firstName }: ProfileProps) {
  const [hide, setHide] = useState(true);
  const navigate = useNavigate();
  function handleHide() {
    hide ? setHide(false) : setHide(true);
  }
  return (
    <div>
      <div onClick={handleHide} className="select-none cursor-pointer	">
        {firstName && firstName.length > 0 ? (
          <ProfileIcon firstName={firstName} />
        ) : (
          <ProfileIcon firstName="?" />
        )}
      </div>
      <div
        className={`absolute border w-28 right-6 top-20 mt-1 bg-white text-center space-y-2 transition-all duration-300 rounded-md ${
          hide ? "hidden ease-in" : "  visible ease-in"
        }`}
      >
        <button className="transition-all duration-200 hover:bg-slate-200   w-full rounded-sm py-2  font-semibold">
          Profile
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          className="transition-all duration-200 hover:bg-red-500 hover:text-white font-semibold
         w-full rounded-sm py-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
