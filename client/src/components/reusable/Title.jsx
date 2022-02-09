import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function SiteHeader() {
  const { auth } = useSelector((state) => state);

  return (
    <Link to={auth.authenticated ? "/contacts" : "/"}>
    <p className="text-xl font-bold font-mono md:block group-hover:block">
      IntuitiveContacts
    </p></Link>
  );
}

export default SiteHeader;
