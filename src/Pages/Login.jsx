import { useState ,useEffect, useRef } from "react";
import { Link , useNavigate} from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const alertShown = useRef(false);
  
  const navigate = useNavigate();

   useEffect(() => {
  const token = localStorage.getItem("token");
  if (token && !alertShown.current) {
    alertShown.current = true;
    navigate("/", { replace: true });
  }
}, [navigate]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const storedEmail = localStorage.getItem("email");
    const storedPass = localStorage.getItem("password");

    if (email.trim() === "" || password.trim() === "") {
      alert("Email & Password Required");
      navigate('/login')
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Enter a valid email");
      return;
    }

    if(password.length < 4 || password.length > 8){
      alert("Enter up to 4 - 8 characters")
      return;
    }

    if (!storedEmail && !storedPass) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("token", "true");
      alert("Account Created!");
      navigate("/",{replace : true});
      return;
    }

 
    if (email === storedEmail && password === storedPass) {
      localStorage.setItem("token", "true");

      const redirect = localStorage.getItem("redirect");
      navigate(redirect || "/",{replace : true});
      localStorage.removeItem("redirect")
      return;
    }
    alert("Invalid Email or Password");
  };

  const handleGoogleSuccess = (response) => {
  localStorage.setItem("token", response.credential);
  navigate("/", { replace: true });
};

const handleGoogleError = () => {
  alert("Google Login Failed");
};


  return (
  <div className={Styles.loginPage}>
    <div className={Styles.loginCard}>
      <h1 className={Styles.title}>Login To Book Tickets</h1>

      <div className={Styles.formGroup}>
        <label className={Styles.label}>Email</label>
        <input
          type="email"
          value={email}
          className={Styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className={Styles.formGroup}>
        <label className={Styles.label}>Password</label>
        <input
          type="password"
          value={password}
          maxLength="8"
          minLength="4"
          className={Styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className={Styles.button} onClick={handleSubmit}>
        Submit
      </button>
      <div className="google-btn">
        <GoogleLogin 
        onSuccess={ handleGoogleSuccess}
        onError={handleGoogleError}
        />
      </div>
    </div>
  </div>
);

}


export default Login;
