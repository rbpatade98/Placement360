import { Outlet } from "react-router";

const AuthenticationLayout = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
        <img className="absolute w-full h-full object-cover opacity-20" src="/assets/img/bg.png" alt="" />
        <Outlet />
    </div>
  )
}

export default AuthenticationLayout