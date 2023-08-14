import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
    const [state, dispatch] = useContext(UserContext)
    return  state.isLogin ? <Outlet/ > : <Navigate to="/" />
}