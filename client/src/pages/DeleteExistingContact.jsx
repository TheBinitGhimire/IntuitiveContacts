import ProfileNav from "../components/reusable/ProfileNav";
import LogoutIcon from "../components/icons/Logout";
import Header from "../components/reusable/Header";

import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { checkToken, deleteContact } from "../services";

function DeleteExistingContactPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentLocation = useLocation();

  useEffect(() => {
    if (
      currentLocation.state &&
      currentLocation.state.previousPage.pathname === "/contacts/" + id
    ) {
      checkToken();
      deleteContact(id);
    }
    navigate("/contacts");
  }, [id, navigate, currentLocation]);

  return (
    <div>
      <Header start={<ProfileNav />} end={<LogoutIcon />} />
    </div>
  );
}

export default DeleteExistingContactPage;
