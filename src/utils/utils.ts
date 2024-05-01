import axios from "axios";
import { useEffect, useState } from "react";
import { NavigateFunction, useLocation } from "react-router-dom";

// const API_V1 = "http://localhost:3000/api/v1";

export const API_V1 =
  "https://payments-app-api-beryl.vercel.app/api/v1" || process.env.API_V1;

interface Signup {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

interface Body {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  toId?: string;
  amount?: number;
}

export function useAPI(
  body: Body,
  api: string,
  method: string,
  protectedRoute: boolean,
  dependency: string | null
) {
  const [data, setData]: any = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  if (!token && protectedRoute) setError("Token not found");
  const header = protectedRoute
    ? { token: token, "content-type": "application/json" }
    : { "content-type": "application/json" };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        let response;
        if (method !== "get") {
          response = await axios({
            method: method,
            url: API_V1 + api,
            data: body,
            headers: header,
          });
        } else {
          response = await axios({
            method: method,
            url: API_V1 + api,
            headers: header,
          });
        }
        setData(response.data);
        setError(response.data.error);
      } catch (error: any) {
        setError(error.response.data.error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [dependency]);
  return { data, isLoading, error };
}

export const handleSignUp = async (
  { firstName, lastName, email, password }: Signup,
  setError: React.Dispatch<React.SetStateAction<string>>,
  navigate: NavigateFunction
) => {
  const signUpApi = API_V1 + "/user/signup";
  const response = await axios.post(
    signUpApi,
    {
      firstName,
      lastName,
      email,
      password,
    },
    { headers: { "Content-Type": "Application/json" } }
  );
  const { success, token, error } = response.data;

  if (error) {
    setError(error);
  }
  if (success && token) {
    localStorage.setItem("token", token);

    navigate("/home");
  }
};

export const handleLogin = async (
  { email, password }: Signup,
  setError: React.Dispatch<React.SetStateAction<string>>,
  navigate: NavigateFunction
) => {
  try {
    const loginApi = API_V1 + "/user/login";
    const response = await axios.post(
      loginApi,
      {
        email,
        password,
      },
      { headers: { "Content-Type": "Application/json" } }
    );
    const { success, token, error } = response.data;

    if (error) {
      setError(error);
    }
    if (success && token) {
      localStorage.setItem("token", token);

      navigate("/home");
    }
  } catch (error: any) {
    setError(error.response.data.error);
  }
};

export function useRedirect(navigate: NavigateFunction, token: string | null) {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (token) {
      if (location.pathname === "/" || location.pathname === "/signup") {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          navigate("/home");
        }, 2 * 1000);
      }
    } else {
      if (location.pathname != "/" && location.pathname != "/signup") {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 2 * 1000);
      }
    }
  }, [token]);
  return loading;
}

export function useDebounce(filter: string) {
  const [debouncedValue, setDebounced] = useState(filter);
  useEffect(() => {
    let timer = setTimeout(() => {
      setDebounced(filter);
    }, 300);

    return () => clearTimeout(timer);
  }, [filter]);

  return debouncedValue;
}
