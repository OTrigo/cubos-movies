import React, { useState } from "react";

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type?: string;
}

export const FormInput = ({
  label,
  name,
  type = "text",
  ...rest
}: FormInputProps) => {
  const [displayValue, setDisplayValue] = useState("");

  const handleDisplayValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDisplayValue(value);
  };

  return (
    <div className="flex flex-col gap-2 overflow-visible">
      <label
        htmlFor={name}
        className="block text-sm font-medium overflow-visible"
      >
        {label} {type === "range" && `- ${displayValue}`}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        onChange={handleDisplayValue}
        className="w-full p-2 bg-[var(--bg-theme-2)] text-[var(--text-default)] rounded 1 appearance-none focus:outline focus:outline-[var(--bg-button-default)] overflow-visible text-[16px]"
        {...rest}
      />
    </div>
  );
};
