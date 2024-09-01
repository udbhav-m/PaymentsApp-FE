import { useLocation, useNavigate } from "react-router-dom";
import { useAPI, useRedirect } from "../utils/utils";
import Profile from "./Profile";
import PageButton from "./PageButton";
import Loader from "./Loader";

function Appbar({ label, to }: { label: string; to: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const loading = useRedirect(navigate, token);
  const { data } = useAPI({}, "/user/me", "get", true, null);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex items-center justify-between mx-7 my-5 p-2  rounded-lg shadow-md">
          <div
            className="flex  items-center gap-2 cursor-pointer"
            onClick={() => navigate("/home")}
          >
            <img src="/public/paytmImg.png" alt="img" className="h-12" />
            <h1 className="sans  text-xl font-semibold select-none">
              PayTM App
            </h1>
          </div>
          {data ? (
            <div className="flex items-center gap-4">
              <h1
                className={`font-semibold ${
                  location.pathname === "/home" ? "visible" : "hidden"
                }`}
              >
                Hello,{" "}
                {data?.firstName
                  ? data?.firstName.charAt(0).toUpperCase() +
                    data?.firstName.slice(1).toLowerCase()
                  : "Mr..?"}
              </h1>
              <div
                className={`${
                  location.pathname == "/home" ? "hidden" : "visible"
                }`}
              >
                <PageButton label={label} to={to} />
              </div>
              <Profile firstName={data?.firstName} />
            </div>
          ) : (
            "not found"
          )}
        </div>
      )}
    </div>
  );
}

export default Appbar;
