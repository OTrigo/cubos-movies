"use client";
import { useTheme } from "@/contexts/ThemeContext";

import { useRef } from "react";

type UploadInputProps = {
  name: string;
  label: string;
};

export function UploadInput({ label, name }: UploadInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { theme } = useTheme();

  return (
    <div>
      <label className={`${theme}  block text-sm font-medium mb-1`}>
        {label}
      </label>
      <input
        ref={inputRef}
        name={name}
        type="file"
        accept="image/*"
        className={`${theme}  mb-2 block w-full text-[var(--text-default)]`}
      />
    </div>
  );
}
