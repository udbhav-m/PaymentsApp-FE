import { ChangeEvent, useState } from "react";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import BottomText from "../components/BottomText";
import { useNavigate } from "react-router-dom";
import { handleLogin, useRedirect } from "../utils/utils";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const loading = useRedirect(navigate, token);
  if (loading) return <>Loading</>;

  return (
    <div className="bg-slate-200 h-screen flex justify-center items-center">
      <div className=" border bg-white flex flex-col text-center w-fit gap-4 px-8 py-8">
        <Heading label={"Login"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox
          label="Email"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          type={"text"}
          placeholder={"jakeP@example.com"}
        />
        <InputBox
          label="Password"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setpassword(e.target.value)
          }
          type={"password"}
          placeholder={"Password"}
        />
        <Button
          onClick={() => {
            handleLogin({ email, password }, setError, navigate);
          }}
          label={"Login"}
        />
        <BottomText
          onClick={() => {
            navigate("/signup");
          }}
          label={"Don't have an account?"}
          to={"Sign-up"}
        />
        {/* <h1 className="text-red-500 text-sm font-semibold">{error}</h1> */}
      </div>
    </div>
  );
}

export default Login;
