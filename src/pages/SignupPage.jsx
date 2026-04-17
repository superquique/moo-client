import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  
  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password, name };

    authService.signup(requestBody)
    .then((response) => {
        navigate('/login');
    })
    .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
    })
  };

  
  return (
    <div className="flex-grow flex items-center justify-center bg-base-100">
      <div className="card w-100 bg-base-200 card-xl shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Sign Up</h2>

          <form className="space-y-4" onSubmit={handleSignupSubmit}>
            <label className="input validator">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  {/* <rect width="20" height="16" x="2" y="4" rx="2"></rect> */}
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input 
                type="email"
                name="email"
                value={email}
                onChange={handleEmail} 
                placeholder="Email"
                required 
              />
            </label>
            <div className="validator-hint hidden">Enter valid email address</div>

            <label className="input validator">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                  ></path>
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </g>
              </svg>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
                placeholder="Password"
                minLength="6"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                title="Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter."
                required
              />
            </label>
            <p className="validator-hint hidden">
              Password must have at least 6 characters, including
              <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
            </p>        

            <label className="input validator">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleName}
                placeholder="Username"
                pattern="/^[A-Za-z0-9-]{3,30}$/"
                minLength="3"
                maxLength="30"
                title="Only letters, numbers or dash"
                required
              />
            </label>
            <p className="validator-hint hidden">
              Must be 3 to 30 characters
              <br />containing only letters, numbers or dash
            </p>

            <div className="text-center">
              <button className="btn btn-primary" type="submit">Sign Up</button>
            </div>
          </form>

          { errorMessage && <p className="error-message">{errorMessage}</p> }

          <div className="justify-end items-center card-actions">
            <p className="text-1">Already have an account?</p>
            <button className="btn">
              <Link to={"/login"}>Login</Link>
            </button>
          </div>
        </div>
      </div>        
    </div>
  )
}

export default SignupPage;