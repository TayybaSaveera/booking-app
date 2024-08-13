import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Link, Navigate, useParams } from "react-router-dom";

import axios from "axios";

function Account() {
  const { ready, user, setUser, setReady } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  if (!ready) {
    return "Loading ..";
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/Login"} />;
  }

  function LinkClasses(type = null) {
    let classes = "py-2 px-6 ";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  }
  async function Logout() {
    await axios.post("/Logout");
    setRedirect("/");
    setUser(null);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <nav className="w-full flex mt-8 gap-2 justify-center mb-8">
        <Link className={LinkClasses("profile")} to={"/account"}>
          MY Profile
        </Link>
        <Link className={LinkClasses("bookings")} to={"/account/bookings"}>
          MY BOOKINGS
        </Link>
        <Link className={LinkClasses("places")} to={"/account/places"}>
          MY Accomodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center mx-auto max-w-lg">
          logged in as {user.name} & {user.email}
          <br />
          <button className="primary max-w-sm mt-4" onClick={Logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Account;
