import ProfileNav from "../components/reusable/ProfileNav";
import LogoutIcon from "../components/icons/Logout";
import Header from "../components/reusable/Header";
import MyContactsProfileArea from "../components/pageComponents/MyContactsProfile";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkToken, getContactProfile } from "../services";

function MyContactsProfilePage() {
  const [contactProfileInformation, setContactProfileInformation] = useState({});

  const { id } = useParams();

  useEffect(() => {
    checkToken();
    const profile = getContactProfile(id);
    Promise.resolve(profile).then((data) => setContactProfileInformation(data));
  }, [id]);

  return (
    <section>
      <Header start={<ProfileNav />} end={<LogoutIcon />} />
      <MyContactsProfileArea
        title="My Contact"
        cid={contactProfileInformation._id}
        name={contactProfileInformation.name}
        phone={contactProfileInformation.phone}
        picture={contactProfileInformation.picture}
        email={contactProfileInformation.email}
        address={contactProfileInformation.address}
      />
    </section>
  );
}

export default MyContactsProfilePage;
