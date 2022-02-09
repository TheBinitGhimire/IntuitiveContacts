import ProfileNav from "../components/reusable/ProfileNav";
import LogoutIcon from "../components/icons/Logout";
import Header from "../components/reusable/Header";
import ContactOperation from "../components/pageComponents/ContactOperation";

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { checkToken, getContactProfile } from "../services";

function ModifyExistingContactPage() {
  const [contactProfileInformation, setContactProfileInformation] = useState(
    {}
  );
  
  const navigate = useNavigate();
  const { id } = useParams();
  const currentLocation = useLocation();

  useEffect(() => {
    if (
      currentLocation.state &&
      currentLocation.state.previousPage.pathname === "/contacts/" + id
    ) {
      checkToken();
      const profile = getContactProfile(id);
      Promise.resolve(profile).then((data) =>
        setContactProfileInformation(data)
      );
    } else navigate("/contacts");
  }, [id, currentLocation, navigate]);

  return (
    <section>
      <Header start={<ProfileNav />} end={<LogoutIcon />} />
      <ContactOperation
        title="Modify Existing Contact"
        name={contactProfileInformation.name}
        phone={contactProfileInformation.phone}
        picture={contactProfileInformation.picture}
        email={contactProfileInformation.email}
        address={contactProfileInformation.address}
      />
    </section>
  );
}

export default ModifyExistingContactPage;
