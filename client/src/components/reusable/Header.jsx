import Title from "../reusable/Title";

function Header(props) {
  return (
    <div className="header p-4 flex flex-row justify-between items-center flex-none">
      {props.start}
      <Title />
      {props.end}
    </div>
  );
}

export default Header;
