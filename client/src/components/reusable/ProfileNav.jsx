import { Link } from "react-router-dom";

function ProfileNav() {
  return (
    <Link to="/profile">
      <div className="w-10 h-10 relative flex flex-shrink-0 hover:opacity-50">
        <img
          className="rounded-full w-full h-full object-cover"
          alt=""
          src={localStorage.getItem("picture")}
        />
      </div>
    </Link>
  );
}

export default ProfileNav;
