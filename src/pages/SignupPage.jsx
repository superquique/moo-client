import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import { EnvelopeIcon, KeyIcon, UserIcon } from "@heroicons/react/24/outline";

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
              <EnvelopeIcon className="size-4 text-black-500" />  
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
              <KeyIcon className="size-4 text-black-500" />
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
              <UserIcon className="size-4 text-black-500" />
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