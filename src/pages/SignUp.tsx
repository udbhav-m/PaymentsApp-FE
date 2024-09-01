import { ChangeEvent, useState } from "react";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import BottomText from "../components/BottomText";
import { useNavigate } from "react-router-dom";
import { handleSignUp, useRedirect } from "../utils/utils";
import Loader from "../components/Loader";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [pin, setpin] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const loading = useRedirect(navigate, token);
  if (loading) return <Loader />;
  return (
    <div className="bg-slate-200 py-4 flex justify-center items-center">
      <div className=" border bg-white flex flex-col text-center w-fit gap-4 p-8">
        <Heading label={"Sign Up"} />
        <SubHeading label={"Enter your information to create an account"} />
        <InputBox
          label="First Name"
          onChange={(e) => setFirstName(e.target.value)}
          type={"text"}
          placeholder={"Jake"}
          readonly={false}
        />
        <InputBox
          label="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          type={"text"}
          placeholder={"Peralta"}
          readonly={false}
        />
        <InputBox
          label="Email"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          type={"text"}
          placeholder={"jakeP@example.com"}
          readonly={false}
        />
        <InputBox
          label="Password"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setpassword(e.target.value)
          }
          type={"password"}
          placeholder={"Password"}
          readonly={false}
        />
        <InputBox
          label="Pin"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setpin(+e.target.value)
          }
          type={"number"}
          placeholder={"Set up a 4 digit Pin"}
          readonly={false}
        />
        <Button
          onClick={() => {
            handleSignUp(
              { firstName, lastName, email, password, pin },
              setError,
              navigate
            );
          }}
          label={"Sign Up"}
        />
        <BottomText
          onClick={() => {
            navigate("/");
          }}
          label={"Already have an account?"}
          to={"Sign-in"}
        />
        <h1 className="text-red-500 text-sm font-semibold">{error}</h1>
      </div>
    </div>
  );
}

export default SignUp;
