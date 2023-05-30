type ButtonProps = {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  primary?: boolean;
  children: React.ReactNode;
};

const Button = ({
  onClick,
  className,
  disabled,
  primary = true,
  children,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={
        "hover:opacity-80 rounded " +
        (primary ? "mx-2 px-6 py-2 text-white " : "") +
        className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
