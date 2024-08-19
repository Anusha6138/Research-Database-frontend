import { useAuth } from "../components/context/AuthContext"
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ permittedRoles, children }) {
    const { user } = useAuth();

    // Check if user data is still loading
    if(!user.isLoggedIn && localStorage.getItem('token')) {
        return <p>loading...</p>
    }

    if(!user.isLoggedIn) {
        return <Navigate to="/login" /> 
    }

    if( !permittedRoles.includes(user?.account?.role)) {
        return <Navigate to="/unauthorized" />
    }
    
    // If all checks pass, render the children components
    return children;
}