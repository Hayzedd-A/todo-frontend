import React, { useState } from "react";
import useSessionId from "./useSession";
import Notification from "./Notification";
import { NotificationContainer } from "react-notifications";
import { motion, AnimatePresence } from "framer-motion";

function Signin({ ipAddress, setSeasion }) {
  let [signIn, setSignIn] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [username, setUsername] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    try {
      setIsLoading(true);
      let response = await fetch(`${ipAddress}/signup`, {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      });
      let result = await response.json();
      if (!result.status) throw new Error(result.message);
      Notification("success", {
        title: "Success",
        body: result.message,
      })();
      setSeasion(result.data);
      setIsLoading(false);
    } catch (error) {
      console.log("There was an error", error);
      Notification("error", {
        title: "Error",
        body: error.message,
      })();
      setIsLoading(false);
    }
  };
  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${ipAddress}/signin`, {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const result = await response.json();
      if (!result.status) throw new Error(result.message);
      Notification("success", {
        title: "Success",
        body: result.message,
      })();
      setSeasion(result.data);
      setIsLoading(false);
    } catch (error) {
      Notification("error", {
        title: "Error",
        body: error.message,
      })();
      setIsLoading(false);
    }
  };
  const handleTogglePassword = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  return (
    <div className="signin">
      <NotificationContainer />
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="animation"
            style={{
              position: "absolute",
              zIndex: "2",
              top: "50%",
              left: "50%",
              fontSize: "3em",
              translateX: "-50%",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <b>Loading...</b>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="subContainer">
        <form onSubmit={e => e.preventDefault()}>
          {signIn || (
            <label htmlFor="email">
              <input
                type="email"
                value={email}
                placeholder="Your Email"
                onChange={e => setEmail(e.target.value)}
              />
            </label>
          )}
          <label htmlFor="username">
            <input
              type="text"
              placeholder={`Your username ${signIn ? "or email" : ""}`}
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            <input
              type={passwordType}
              placeholder="Your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <span
              id="toggle-password-visibility"
              onClick={() => handleTogglePassword()}
            >
              {passwordType === "password" ? (
                <span id="show">
                  <svg
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </span>
              ) : (
                <span id="hide">
                  <svg
                    fill="none"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 6.36185C8.36209 5.55936 10.0212 5 12 5C18.3074 5 21.3671 10.6832 21.9109 11.808C21.9705 11.9311 21.9702 12.0694 21.9107 12.1926C21.5585 12.9208 20.1542 15.5545 17.5 17.3244M14 18.8001C13.3735 18.9286 12.7071 19 12 19C5.69265 19 2.63286 13.3168 2.08909 12.192C2.02953 12.0689 2.03049 11.9291 2.09008 11.8059C2.30875 11.3539 2.9298 10.1741 4 8.92114"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d="M10 9.76389C10.5308 9.28885 11.2316 9 12 9C13.6569 9 15 10.3431 15 12C15 12.7684 14.7111 13.4692 14.2361 14"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                    <path
                      d="M3 3L21 21"
                      stroke="black"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </span>
              )}
            </span>
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
