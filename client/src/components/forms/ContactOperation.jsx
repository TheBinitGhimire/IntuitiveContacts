import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  checkToken,
  createContact,
  getContactProfile,
  updateContact,
} from "../../services";

function ContactOperationForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    picture:
      "https://res.cloudinary.com/binit/image/upload/v1644233860/IntuitiveContacts/profile_ya4nx1.png",
    email: "",
    address: "",
  });

  const [isNew, setIsNew] = useState(1);

  const navigate = useNavigate();
  const params = useParams();
  const currentPage = useLocation();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let response = "";
    checkToken();
    if (currentPage.pathname.startsWith("/contacts/modify")) {
      response = updateContact(params.id, formData);
    } else {
      response = createContact(formData);
    }
    Promise.resolve(response).then((data) => {
      if (data._id) {
        navigate("/contacts/" + data._id);
      } else navigate("/contacts");
    });
  };

  useEffect(() => {
    if (currentPage.pathname.startsWith("/contacts/modify")) {
      setIsNew(0);
      const contactProfile = getContactProfile(params.id);
      Promise.resolve(contactProfile).then((data) => {
        const { name, phone, picture, email, address } = data;
        setFormData({ name, phone, picture, email, address });
      });
    }
  }, [params, currentPage]);

  return (
    <form className="mt-8 space-y-6" action="#" onSubmit={handleSubmit}>
      <input
        type="hidden"
        name="picture"
        onChange={handleChangeInput}
        value={
          formData.picture
            ? formData.name
            : "https://res.cloudinary.com/binit/image/upload/v1644233860/IntuitiveContacts/profile_ya4nx1.png"
        }
      />
      <div className="rounded-md shadow-sm -space-y-px">
        <div className="p-1">
          <label htmlFor="name" className="sr-only">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name ? formData.name : ""}
            autoComplete="name"
            onChange={handleChangeInput}
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Full name"
          />
        </div>
        <div className="p-1">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            value={formData.email ? formData.email : ""}
            autoComplete="email"
            onChange={handleChangeInput}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
        </div>
        <div className="p-1">
          <label htmlFor="phone-number" className="sr-only">
            Phone number
          </label>
          <input
            id="phone-number"
            name="phone"
            type="tel"
            value={formData.phone ? formData.phone : ""}
            autoComplete="tel"
            onChange={handleChangeInput}
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Phone number"
          />
        </div>
        <div className="p-1">
          <label htmlFor="address" className="sr-only">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            value={formData.address ? formData.address : ""}
            autoComplete="street-address"
            onChange={handleChangeInput}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Address"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          {isNew ? "Create" : "Update"}
        </button>
      </div>
    </form>
  );
}

export default ContactOperationForm;
