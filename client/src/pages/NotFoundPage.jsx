import Header from "../components/reusable/Header";
import ProfileNav from "../components/reusable/ProfileNav";
import LogoutIcon from "../components/icons/Logout";

import PhoneIcon from "../components/icons/Phone";
import HomeIcon from "../components/icons/Home";

import { useSelector } from "react-redux";

function NotFoundPage() {
  const { auth } = useSelector((state) => state);

  return (
    <section>
      <Header
        start={auth.authenticated ? <ProfileNav /> : <PhoneIcon />}
        end={auth.authenticated ? <LogoutIcon /> : <HomeIcon />}
      />
      <div className="flex flex-row p-2 m-auto w-0 min-w-full">
        <div className="z-10 flex-col items-start p-4 object-center text-center m-auto justify-center">
          <h2 className="mt-8 text-center text-8xl font-mono font-bold text-red-100">
            Not Found!
          </h2>
          <p className="mt-2 p-4 text-center text-xl text-gray-200">
            The requested page doesn't exist.
          </p>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;
