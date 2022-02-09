import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getContactProfile } from "../../services";

function FavoriteContact(props) {
  const [information, setInformation] = useState({});

  const [toShow, setToShow] = useState(0);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/contacts/" + props.cid);
  };

  const removeFavorite = () => {
    let favorites = JSON.parse(localStorage.favorites);
    favorites.splice(favorites.indexOf(props.cid), 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setToShow(0);
  };

  useEffect(() => {
    const contactInformation = getContactProfile(props.cid);
    Promise.resolve(contactInformation).then((data) => {
      if (data && data._id && data.name && data.picture) {
        setToShow(1);
        setInformation(data);
      }
    });
  }, [props]);
  
  return (
    <div>
      {toShow ? (
        <div className="text-sm text-center mr-4">
          <div className="p-1 border-4 border-transparent rounded-full">
            <div className="w-16 h-16 relative flex flex-shrink-0">
              <img
                className="shadow-md rounded-full w-full h-full object-cover"
                src={information.picture}
                onClick={handleClick}
                alt=""
              />
              <div
                onClick={removeFavorite}
                className="absolute bg-gray-900 p-1 rounded-full bottom-0 right-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 fill-red-600 hover:fill-red-200"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
          <p>{information.name}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default FavoriteContact;
