import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("registered successfully");
    } catch (e) {
      alert("registered unsuccessfully");
    }
  }

  return (
    <div>
      <div className="mt-5 grow flex items-center justify-around">
        <div className="mb-64">
          <h1 className="text-4xl text-center mb-4 ">Register</h1>
          <form className="max-w-md mx-auto " onSubmit={registerUser}>
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
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
            <button className="primary">Register</button>
            <div className="text-center my-1 text-gray-500">
              Already have account!
              <Link className="underline text" to={"/Login"}>
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
