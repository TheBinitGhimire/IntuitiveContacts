import { useNavigate } from "react-router-dom";

function ContactListing(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/contacts/" + props.cid);
  };

  const makeFavorite = () => {
    const newFavorite = props.cid;
    let current = [];
    if(localStorage.favorites) current = JSON.parse(localStorage.favorites);
    if(!current.includes(newFavorite)) current.push(newFavorite);
    localStorage.setItem("favorites", JSON.stringify(current));
    window.location.reload();
  }

  return (
    <div className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative">
      <div
        onClick={handleClick}
        className="w-16 h-16 relative flex flex-shrink-0"
      >
        <img
          className="shadow-md rounded-full w-full h-full object-cover"
          src={props.picture}
          alt=""
        />
      </div>
      <div
        onClick={handleClick}
        className="flex-auto min-w-0 ml-4 mr-6 md:block group-hover:block"
      >
        <p className="font-bold" data-name={props.name}>
          {props.name}
        </p>
        <div className="flex items-center text-sm">
          <div className="min-w-0">
            <p className="truncate">{props.phone}</p>
          </div>
        </div>
      </div>
      <div onClick={makeFavorite} className="w-8 h-8 flex-shrink-0 md:block group-hover:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          className="fill-gray-600 hover:fill-red-800"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}

export default ContactListing;
