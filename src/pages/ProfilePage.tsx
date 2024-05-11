import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import InputBox from "../components/InputBox";
import { API_V1, useAPI } from "../utils/utils";
import Button from "../components/Button";
import Heading from "../components/Heading";
import axios from "axios";
import Loader from "../components/Loader";

interface Update {
  firstName?: string;
  lastName?: string;
  password?: string;
}

function Profile() {
  const { data, isLoading } = useAPI({}, "/user/me", "get", true, null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const token = localStorage.getItem("token");
  let payload: Update = {};
  if (firstName && firstName.length > 3) payload.firstName = firstName;
  if (lastName && lastName.length > 3) payload.lastName = lastName;
  if (password && password.length > 5) payload.password = password;

  const handleUpdate = async () => {
    try {
      if (!token) {
        return setError("Invalid user");
      }
      const response = await axios.put(API_V1 + "/user/update", payload, {
        headers: { token: token, "Content-Type": "application/json" },
      });
      console.log(response);

      if (response?.data?.success) {
        setMessage(response?.data?.success);
      }
      if (response?.data?.error) {
        setError(response?.data?.error);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
      setMessage("");
    }, 10000);

    return () => clearTimeout(timer);
  }, [message, error]);

  if (isLoading) return <Loader />;
  return (
    <>
      <Appbar label="" to="" />
      <div className="flex justify-center text-center">
        <div className="flex flex-col gap-3 p-8 mt-2 border w-fit">
          <Heading label="Update details" />
          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            label="First Name"
            placeholder={data?.firstName}
            type="text"
            readonly={false}
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            label="Last Name"
            placeholder={data?.lastName}
            type="text"
            readonly={false}
          />
          <InputBox
            onChange={() => 1}
            label="Email"
            placeholder={data?.email}
            type="text"
            readonly={true}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder={"Password"}
            type="password"
            readonly={false}
          />
          <Button label="Save" onClick={handleUpdate} />

          <div>
            <h1
              className={`font-semibold  text-red-500 ${error ? "visible" : ""}
              }`}
            >
              {error}
            </h1>
            <h1
              className={`font-semibold   text-emerald-500 ${
                message ? "visible" : ""
              }
              }`}
            >
              {message}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
