function Button({ children, onClick, variant = "primary" }) {
  const baseStyles = "px-4 py-2 rounded-md text-white font-medium";
  const primaryStyles = "bg-primary hover:bg-primary-hover";
  const secondaryStyles = "bg-gray-500 hover:bg-gray-600";

  const styles = {
    primary: primaryStyles,
    secondary: secondaryStyles,
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${styles[variant]}`}>
      {children}
    </button>
  );
}

export default Button;
