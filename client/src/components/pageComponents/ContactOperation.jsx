import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { checkToken, uploadImage } from "../../services";
import GoBack from "../buttons/Back";
import ContactOperationForm from "../forms/ContactOperation";

function ContactOperation(props) {
  const [imageURL, setImageURL] = useState(props.picture);
  const [isNew, setIsNew] = useState(1);

  const currentPage = useLocation();

  const imageSelection = (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    checkToken();
    Promise.resolve(uploadImage(formData)).then((data) => {
      if (data && data.imageURL) setImageURL(data.imageURL);
    });
  };

  useEffect(() => {
    if (currentPage.pathname.startsWith("/contacts/modify")) {
      setIsNew(0);
      setImageURL(props.picture);
    }
  }, [currentPage.pathname, props.picture]);

  return (
    <div className="flex flex-row p-2 m-auto overflow-auto w-0 min-w-full">
      <div className="z-10 flex-col items-start p-4 object-center text-center m-auto justify-center">
        <GoBack />
        <p className="mb-3 p-4 font-sans text-2xl font-black text-white">
          <span className="block font-light">{props.title}</span>
        </p>

        <div className="w-24 h-24 mx-auto cursor-pointer relative">
          <label htmlFor="image">
            <img
              className="shadow-md rounded-full w-full h-full object-cover absolute"
              src={imageURL}
              alt=""
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24 opacity-0 hover:opacity-40 absolute fill-gray-900"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <input
            id="image"
            className="hidden"
            onChange={imageSelection}
            name="image"
            type="file"
            accept="image/png, image/jpg, image/jpeg"
          ></input>
        </div>
        {isNew ? (
          <ContactOperationForm picture={imageURL} />
        ) : (
          <ContactOperationForm
            name={props.name}
            phone={props.phone}
            picture={imageURL}
            email={props.email}
            address={props.address}
          />
        )}
      </div>
    </div>
  );
}

export default ContactOperation;
