import { ChangeEvent, useEffect, useState } from "react";
import InputBox from "../components/InputBox";
import ProfileIcon from "../components/ProfileIcon";
import { API_V1 } from "../utils/utils";
import Button from "../components/Button";
import Appbar from "../components/Appbar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Pin from "../components/Pin";

function Transfer() {
  const [amount, setAmount] = useState<number>(0);
  const [pin, setPin] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [toId, setTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const to = queryParams.get("to");
  const fn = queryParams.get("firstName");
  const ln = queryParams.get("lastName");
  useEffect(() => {
    if (to && fn && ln) {
      setTo(to);
      setFirstName(fn);
      setLastName(ln);
    }
  }, [to, fn, ln]);

  const handleOnClick = async () => {
    try {
      setLoading(true);
      const t = localStorage.getItem("token");
      let token: string = t ? t : "";

      const response = await axios.post(
        API_V1 + "/account/transfer",
        { toId, amount, pin },
        {
          headers: {
            token: token,
            "Content-Type": "Application/json",
          },
        }
      );

      setLoading(false);
      if (response.data.error) {
        setError(error);
      } else {
        setError("");
        setMessage(response.data.success);
      }
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.error);
      setMessage("");
    }
  };

  const promptPin = () => {
    if (amount && amount > 0) setPrompt(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
      setMessage("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [message, error]);

  return (
    <div className={`${loading ? "hover:cursor-wait" : ""} relative`}>
      {prompt ? (
        <div className="fixed inset-0 bg-black h-screen w-full bg-opacity-45 flex justify-center items-center">
          <Pin
            handleOnChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPin(+e.target.value)
            }
            handleOnclick={() => {
              setPrompt(false);
              handleOnClick();
            }}
            onCancel={() => {
              setPrompt(false);
              setAmount(0);
            }}
          />
        </div>
      ) : (
        ""
      )}
      <Appbar label="Home" to="/home" />
      <div className={`flex justify-center mt-28 z-0 `}>
        <div className="w-96 rounded shadow-2xl p-10 h-96 flex flex-col gap-6 text-center">
          <h1 className="font-SS text-xl font-semibold">Transfer Money</h1>
          <div className="flex items-center gap-6">
            <ProfileIcon firstName={firstName || "?"} />
            <h1 className="text-lg font-medium">
              {firstName + " " + lastName}
            </h1>
          </div>
          <InputBox
            label="Amount in Rs"
            placeholder="Enter Amount"
            type="number"
            onChange={(e) => setAmount(parseInt(e.target.value))}
            readonly={false}
          />
          <Button label="Send money" onClick={promptPin} />
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
    </div>
  );
}

export default Transfer;
