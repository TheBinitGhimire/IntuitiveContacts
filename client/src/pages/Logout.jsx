import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../services";
import { useNavigate } from "react-router-dom";

function LogoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth } = useSelector((state) => state);

  if (auth.authenticated) signOutUser(dispatch);

  useEffect(() => {
    navigate("/");
  });

  return "";
}

export default LogoutPage;
