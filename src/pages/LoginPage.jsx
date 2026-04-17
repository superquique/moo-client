import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context"; 
import authService from "../services/auth.service";
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/outline";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  
  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
 
    authService.login(requestBody)
      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken
        console.log('JWT token', response.data.authToken );
        storeToken(response.data.authToken); 
        authenticateUser();
        navigate('/');                                 
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
          <h2 className="card-title">Login</h2>

          <form className="space-y-4" onSubmit={handleLoginSubmit}>
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

            <label className="input">
              <KeyIcon className="size-4 text-black-500" />
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
                placeholder="Password"                
                required
              />
            </label>
            <p className="validator-hint hidden">
              Enter a password
            </p>        

            <div className="text-center">
              <button className="btn btn-primary" type="submit">Login</button>
            </div>
          </form>

          { errorMessage && <p className="text-1">{errorMessage}</p> }

          <div className="justify-end items-center card-actions">
            <p className="text-1">Don't have an account yet?</p>
            <button className="btn">
              <Link to={"/signup"}> Sign Up</Link>
            </button>
          </div>
        </div>
      </div>        
    </div>
  )
}

export default LoginPage;
