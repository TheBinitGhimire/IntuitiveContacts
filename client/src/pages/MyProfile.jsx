import ProfileNav from "../components/reusable/ProfileNav";
import LogoutIcon from "../components/icons/Logout";
import Header from "../components/reusable/Header";
import MyProfileArea from "../components/pageComponents/MyProfile";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkToken, getProfile } from "../services";

function MyProfilePage() {
  const { app } = useSelector((state) => state);
  
  const dispatch = useDispatch();

  useEffect(() => {
    checkToken();
    getProfile(dispatch);
  }, [dispatch]);

  return (
    <section>
      <Header start={<ProfileNav />} end={<LogoutIcon />} />
      <MyProfileArea
        title="My Profile"
        name={app.name}
        picture={app.picture}
        email={app.email}
        phone={app.phone}
      />
    </section>
  );
}

export default MyProfilePage;
