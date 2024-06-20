import React, { useState } from "react";
import useSessionId from "./useSession";
import Notification from "./Notification";
import { NotificationContainer } from "react-notifications";

function Signin({ ipAddress, setSeasion }) {
  let [signIn, setSignIn] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [username, setUsername] = useState("");

  const handleSignup = () => {
    // console.log(`http://${ipAddress}/signup`);
    fetch(`http://${ipAddress}/signup`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          Notification("success", {
            title: "Success",
            body: data.message,
          })();
          setSeasion(data.data);
        } else {
          Notification("error", {
            title: "Error",
            body: data.message,
          })();
        }
        console.log(data);
      })
      .catch((err) => {
        console.log("There was an error", err);
        Notification("error", {
          title: "Error",
          body: err.message,
        })();
      });
  };
  const handleSignIn = () => {
    fetch(`http://${ipAddress}/signin`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          console.log(data);
          Notification("success", {
            title: "Success",
            body: data.message,
          })();
          setSeasion(data.data);
        } else {
          console.log("this");
          Notification("error", {
            title: "Error",
            body: data.message,
          })();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signin">
      <NotificationContainer />
      <div className="subContainer">
        <form onSubmit={(e) => e.preventDefault()}>
          {signIn || (
            <label htmlFor="email">
              <input
                type="email"
                value={email}
                placeholder="Your username"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          )}
          <label htmlFor="username">
            <input
              type="text"
              placeholder={`Your Email ${signIn ? "or Username" : ""}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {signIn ? (
            <input type="submit" value="Sign in" onClick={handleSignIn} />
          ) : (
            <input type="submit" value="Sign Up" onClick={handleSignup} />
          )}
        </form>
        {!signIn ? (
          <p>
            Already have an account?{" "}
            <a href="#" onClick={() => setSignIn(true)}>
              Sign in
            </a>
          </p>
        ) : (
          <p>
            Don't have an account?{" "}
            <a href="#" onClick={() => setSignIn(false)}>
              Sign up
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default Signin;
