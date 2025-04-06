import React, { useEffect, useState } from "react";
import "./LoginPage.css";

function LoginPage() {
  const [isPhone, setIsPhone] = useState(window.innerWidth <= 1000);

  const handleGoogleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsPhone(window.innerWidth <= 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="sign-in-page">
      <div className="sign-in-container">
        <div className="sign-in-text">
          {isPhone ? (
            <>
              <h1 style={{ fontSize: "32px" }}>Let’s Get Things Done!</h1>
              <h2 style={{ fontSize: "25px" }}>
                Your plans, your way – all in one place.
              </h2>
            </>
          ) : (
            <>
              <h1>Let’s Get Things Done!</h1>
              <h2>Your plans, your way – all in one place.</h2>
            </>
          )}
        </div>
        <div className="sign-in-form">
          {isPhone ? (
            <>
              <h1 style={{ fontSize: "32px" }}>Start Planning</h1>
            </>
          ) : (
            <>
              <h1>Start Planning</h1>
            </>
          )}
          <button onClick={handleGoogleLogin}>
            <img
              src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw"
              alt="Google Logo"
              className="w-6 h-6 mr-2"
            />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
