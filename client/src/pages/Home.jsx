import { useContext } from "react";
import { AppState } from "../App";

export default function Home() {
  const {
    user: { username },
  } = useContext(AppState);
  console.log(username);
  return (
    <div>
      <span className="text-6xl m-10">Welcome {username}</span>
    </div>
  );
}
