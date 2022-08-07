import "./Button.css";

const Button = ({ onClick, type, children }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
