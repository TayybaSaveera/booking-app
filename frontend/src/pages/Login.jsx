import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function loginUser(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/Login", { email, password });
      setUser(data);
      alert("login succcessful");
      setRedirect(true);
    } catch (error) {
      alert("login failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="mt-5 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4 ">Login</h1>
        <form className="max-w-md mx-auto " onSubmit={loginUser}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center my-1 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text" to={"/Register"}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
