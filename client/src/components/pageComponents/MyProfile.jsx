import GoBack from "../buttons/Back";

function MyProfileArea(props) {
  return (
    <div className="flex flex-row p-2 m-auto overflow-auto w-0 min-w-full">
      <div className="z-10 flex-col items-start p-4 object-center text-center m-auto justify-center">
        <GoBack />
        <p className="mb-3 p-4 font-sans text-2xl font-black text-white">
          <span className="block font-light">{props.title}</span>
        </p>
        <div className="w-24 h-24 mx-auto cursor-pointer relative">
          <img
            className="shadow-md rounded-full w-full h-full object-cover absolute"
            src={props.picture}
            alt={props.name}
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
        </div>
        <p className="mb-3 pt-4 pb-2 p-2 font-sans text-4xl font-black text-white">
          {props.name}
        </p>
        <div className="p-4">
          <span className="h-8 px-4 py-2 font-sans text-lg font-bold text-red-600 bg-white rounded-full">
            Email: {props.email}
          </span>
        </div>
        <div className="p-4">
          <span className="h-8 px-4 py-2 font-sans text-lg font-bold text-red-600 bg-white rounded-full">
            Phone: {props.phone}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MyProfileArea;
