import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsAnon( { children } ) {
  
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return (
    <div className="flex pt-10 h-screen items-start justify-center">
      <span className="loading loading-spinner loading-xl"></span>
    </div>
  );

  if (isLoggedIn) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

export default IsAnon;