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
          <h1
            onClick={() => navigate("/home")}
            className="sans  text-xl font-semibold select-none"
          >
            PayTM App
          </h1>
          {data ? (
            <div className="flex items-center gap-4">
              <h1
                className={`font-semibold ${
                  location.pathname === "/home" ? "visible" : "hidden"
                }`}
              >
                Hello, {data?.firstName}
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
