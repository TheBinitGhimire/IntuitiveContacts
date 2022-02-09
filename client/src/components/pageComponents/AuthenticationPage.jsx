import { NavLink } from "react-router-dom";

function AuthenticationArea(props) {
  return (
    <div className="flex flex-row p-2 m-auto overflow-auto w-0 min-w-full">
      <div className="z-10 flex-col items-start p-4 object-center text-center m-auto justify-center">
        <h2 className="mt-8 text-center text-3xl font-mono font-bold text-red-100">
          {props.title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-200">
          Or,&nbsp;
          <NavLink
            to={props.url}
            className="font-medium text-xl text-red-200 hover:text-indigo-100"
          >
            {props.message}
          </NavLink>
        </p>
        {props.form}
      </div>
    </div>
  );
}

export default AuthenticationArea;
