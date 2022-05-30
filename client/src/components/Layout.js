import { useState, useEffect } from "react";
import Header from "./Header";
import Logotype from "../icons/logotype.svg";

function Center({ children, style }) {
  return (
    <div style={style} className="center">
      {children}
      <style jsx>{`
        .center {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}

function Page({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>

      <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
        }
        body {
          background-color: #efedf0;
          font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
          color: #6b6b8e;
        }
        main {
          padding-top: 80px;
        }
      `}</style>
    </div>
  );
}

export default Center;
export { Page };
