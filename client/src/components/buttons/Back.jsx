import { useNavigate } from "react-router-dom";

function GoBack() {
  let navigate = useNavigate();
  const previous = () => {
    navigate("/contacts");
  }
  return (
    <div className="p-4">
      <button className="relative bg-slate-600 text-white p-3 rounded-lg text-sm uppercase font-semibold tracking-tight overflow-visible" onClick={previous}>
        Go back!
        <div className="absolute -top-3 -right-3 px-2.5 py-0.5 bg-red-500 rounded-full text-xs">
          NOW
        </div>
      </button>
    </div>
  );
}

export default GoBack;
