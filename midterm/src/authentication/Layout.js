import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Link to="/login">Login</Link>
      <Outlet />
    </>
  )
};

export default Layout;