

type ButtonProps = {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
};

const Button = ({ onClick, className, disabled, children }: ButtonProps) => {
  return (
    <button onClick={onClick} className={"rounded " + className} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
