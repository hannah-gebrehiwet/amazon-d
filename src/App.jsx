import { useState, useEffect, useContext } from "react";
import Routing from "./Routing";
import { Datacontext } from "./component/DataProvider/DataProvider";
import { auth } from "./Utility/firebase";
import { Type } from "./Utility/action.type";

function App() {
  const [count, setCount] = useState(0);
  const [{ user }, dispach] = useContext(Datacontext);
  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        dispach({
          type: Type.SET_USER,
          user: authuser,
        });
      } else {
        dispach({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;
