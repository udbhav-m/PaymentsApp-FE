import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import SearchBar from "../components/SearchBar";
import Usercard from "../components/Usercard";
import { useAPI, useDebounce } from "../utils/utils";

export interface Users {
  UID: string;
  firstName: string;
  lastName: string;
  email: string;
}

function Home() {
  const [filter, setFilter] = useState("");
  const debouncedValue = useDebounce(filter);
  const [users, setUsers] = useState<Users[]>([]);
  const balanceResponse = useAPI({}, "/account/balance", "get", true, null);
  const { data } = useAPI(
    {},
    `/user/search?filter=${filter}`,
    "get",
    true,
    debouncedValue
  );

  useEffect(() => {
    setUsers(data.users);
    if (debouncedValue == "") {
      setUsers([]);
    }
  }, [debouncedValue]);

  return (
    <>
      <Appbar label="" to="" />
      <div className="flex flex-col pt-8 px-10 gap-5">
        <h1 className=" font-SS font-semibold">
          Your balance:
          {balanceResponse.data.balance
            ? ` ₹${balanceResponse.data?.balance}`
            : " Getting your balance"}
        </h1>
        <SearchBar
          label={"Users"}
          onChange={(e: any) => setFilter(e.target.value)}
        />
        <div className="divide-y-2 text-center pt-3">
          {users && users.length > 0 ? (
            users.map((user: Users) => (
              <Usercard
                key={user.UID}
                firstName={user.firstName}
                lastName={user.lastName}
                to={user.UID}
              />
            ))
          ) : (
            <h1 className="font-semibold text-gray-500">{!filter? "Search for users":"Type a bit more.."}</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
