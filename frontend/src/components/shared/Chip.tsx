const Chip: React.FC<{ label: string; color?: string; size?: string }> = ({
  label,
  color = "bg-blue-500 text-white",
  size = "px-3 py-1 text-xs font-medium",
}) => {
  return <span className={`${color} ${size} rounded-full`}>{label}</span>;
};

export default Chip;
