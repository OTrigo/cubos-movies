"use client";

import { useRef } from "react";

type UploadInputProps = {
  name: string;
  label: string;
};

export function UploadInput({ label, name }: UploadInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        ref={inputRef}
        name={name}
        type="file"
        accept="image/*"
        className="mb-2 block w-full text-white"
      />
    </div>
  );
}
