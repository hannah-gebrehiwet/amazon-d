import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Datacontext } from "../DataProvider/DataProvider";

function ProtectedRoute({ children, msg, redirect }) {
  const navigate = useNavigate();
  const [{ user }, dispach] = useContext(Datacontext);
  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { msg, redirect } });
    }
  }, [user]);
  return children;
}

export default ProtectedRoute;
