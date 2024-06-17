import React from "react";

function Signin() {
  return (
    <div className="signin">
      <div className="subContainer">
        <form action="#">
          <label htmlFor="email">
            <input type="email" placeholder="Your email" />
          </label>
          <label htmlFor="username">
            <input type="text" placeholder="Your username" />
          </label>
          <label htmlFor="password">
            <input type="password" placeholder="Your password" />
          </label>
          <input type="submit" value="Sign in" />
        </form>
        <p>
          Don't have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Signin;
