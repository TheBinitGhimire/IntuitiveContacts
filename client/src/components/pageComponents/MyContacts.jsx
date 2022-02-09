import FavoriteContact from "../reusable/Favorite";
import Contact from "../reusable/Contact";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getContacts, checkToken } from "../../services";

function MyContactsArea(props) {
  const [contactsList, setContactsList] = useState({});
  const [favoritesList, setFavoritesList] = useState({});

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    checkToken();
    const contacts = getContacts();
    Promise.resolve(contacts).then((data) => setContactsList(data));
  }, []);

  useEffect(() => {
    if (localStorage.favorites) {
      const favorites = JSON.parse(localStorage.getItem("favorites"));
      setFavoritesList(favorites);
    }
  }, []);

  return (
    <div>
      <div className="search-box p-4 flex-none">
        <div className="relative">
          <label>
            <input
              className="rounded-full py-2 pr-6 pl-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
              type="text"
              placeholder="Search Contacts"
              onKeyPress={handleSubmit}
            />
            <span className="absolute top-0 left-0 mt-2 ml-3 inline-block">
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <path
                  fill="#bbb"
                  d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                />
              </svg>
            </span>
          </label>
        </div>
      </div>

      <div className="flex flex-row p-2 overflow-auto w-0 min-w-full">
        <Link to="/contacts/create">
          <div className="text-sm text-center mr-4">
            <div className="p-1 border-4 border-transparent rounded-full">
              <div className="w-16 h-16 relative flex flex-shrink-0">
                <button
                  className="flex-shrink-0 focus:outline-none bg-gray-800 text-gray-500 rounded-full w-16 h-16"
                  type="button"
                >
                  <svg
                    className="w-full h-full fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z" />
                  </svg>
                </button>
              </div>
            </div>
            <p>Add New</p>
          </div>
        </Link>

        {/* Favorite Contacts | Start */}
        {favoritesList.length > 0 &&
          favoritesList.map((cid) => (
            <FavoriteContact
              key={cid}
              cid={cid}
            />
          ))}
        {/* Favorite Contacts | End */}
      </div>

      <div className="contacts p-2 flex-1 overflow-y-scroll">
        {/* Contacts Listing | Start */}
        {contactsList.length > 0 &&
          contactsList.map((contact) => (
            <Contact
              key={contact._id}
              cid={contact._id}
              name={contact.name}
              phone={contact.phone}
              picture={contact.picture}
              email={contact.email}
              address={contact.address}
            />
          ))}
        {/* Contacts Listing | End */}
      </div>
    </div>
  );
}

export default MyContactsArea;
