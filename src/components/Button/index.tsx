import React, { ButtonHTMLAttributes } from "react";
import "./style.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <div>
      <button
        className={`button ${isOutlined ? "outlined" : ""}`}
        {...props}
      ></button>
    </div>
  );
}
