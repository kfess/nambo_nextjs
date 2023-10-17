import md5 from "md5";

const textColorClasses = [
  "text-orange-600",
  "text-purple-600",
  "text-blue-600",
  "text-green-600",
  "text-red-600",
];

const borderLColorClasses = [
  "border-l-orange-800",
  "border-l-purple-800",
  "border-l-blue-800",
  "border-l-green-800",
  "border-l-red-800",
];

export const getColorClass = (
  arg: string,
  element: "text" | "border-l" = "text"
) => {
  const hash = md5(arg);
  if (element === "text") {
    const index = parseInt(hash, 16) % textColorClasses.length;
    return textColorClasses[index];
  } else if (element === "border-l") {
    const index = parseInt(hash, 16) % borderLColorClasses.length;
    return borderLColorClasses[index];
  }
};
