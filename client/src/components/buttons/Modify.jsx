import { useNavigate, useLocation } from "react-router-dom";

function MakeChanges(props) {
  let navigate = useNavigate();
  let currentLocation = useLocation();

  const modification = () => {
    navigate("/contacts/modify/" + props.cid, { state: { previousPage: currentLocation } });
  };
  const removal = () => {
    navigate("/contacts/delete/" + props.cid, { state: { previousPage: currentLocation } });
  };
  return (
    <div className="p-4">
      <button
        className="relative bg-red-600 text-white p-3 mx-2 my-4 rounded-lg text-sm uppercase font-semibold tracking-tight overflow-visible"
        onClick={modification}
      >
        Make changes!
        <div className="absolute -top-3 -right-3 px-2.5 py-0.5 bg-slate-500 rounded-full text-xs">
          NOW
        </div>
      </button>
      <button
        className="relative bg-red-600 text-white p-3 mx-2 my-4 rounded-lg text-sm uppercase font-semibold tracking-tight overflow-visible"
        onClick={removal}
      >
        Remove contact!
        <div className="absolute -top-3 -right-3 px-2.5 py-0.5 bg-slate-500 rounded-full text-xs">
          NOW
        </div>
      </button>
    </div>
  );
}

export default MakeChanges;
