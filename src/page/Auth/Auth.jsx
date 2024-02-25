import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import classes from "./signup.module.css";
import { auth } from "../../Utility/firebase";
import { useState, useContext } from "react";
import { Datacontext } from "../../component/DataProvider/DataProvider";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { Type } from "../../Utility/action.type";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signIn: false, signUp: false });
  const [{ user }, dispatch] = useContext(Datacontext);
  const navigate = useNavigate();
  const navStateData = useLocation();
  console.log(user);
  const authHandler = async (e) => {
    e.preventDefault();
    //console.log(e.target.name);

    if (e.target.name == "SignIn") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          //console.log(userinfo);
          dispatch({
            type: Type.SET_USER,
            user: userinfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          //console.log(userinfo);
          dispatch({
            type: Type.SET_USER,
            user: userinfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((error) => {
          setError(error.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };
  //console.log(password, email);
  return (
    <section className={classes.login}>
      {/* logo */}
      <Link to="/">
        <img
          src="https://www.freepnglogos.com/uploads/amazon-png-logo-vector/woodland-gardening-amazon-png-logo-vector-8.png"
          alt=""
        />
      </Link>
      {/* form */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              color: "red",
              padding: "5px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="password"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            name="SignIn"
            type="submit"
            onClick={authHandler}
            className={classes.login_signinButton}
          >
            {loading.signIn ? (
              <ClipLoader color="#000" size={15}></ClipLoader>
            ) : (
              " Sign In"
            )}
          </button>
        </form>
        {/**areement */}
        <p>
          By continuing, you agree to Fake-Amazon-project Conditions of Use and
          Privacy Notice.
        </p>
        {/*create account*/}
        <button
          name="SignUp"
          type="submit"
          onClick={authHandler}
          className={classes.login_registerButton}
        >
          {" "}
          {loading.signUp ? (
            <ClipLoader color="#000" size={15}></ClipLoader>
          ) : (
            " Create Your Amazone Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
