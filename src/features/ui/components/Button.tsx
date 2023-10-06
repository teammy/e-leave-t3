import { type ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  color?: "primary" | "secondary" | "default";
  align: "left" | "center" | "right";
}

const Button = ({
  color = "default",
  align = "left",
  children,
}: ButtonProps) => {

  const colorClasses = {
    primary: "bg-blue-500 hover:bg-blue-700",
    secondary: "bg-gray-500 hover:bg-gray-700",
    default: "bg-gray-500 hover:bg-gray-700",
  }[color];

  return (
    <button className="inline-block rounded px-6 pb-2 uppercase leading-normal text-white">{ children}</button>
  );
};

export default Button;
