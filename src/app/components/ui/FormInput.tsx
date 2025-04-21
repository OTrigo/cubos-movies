interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type?: string;
}

export const FormInput = ({
  label,
  name,
  type = "text",
  ...rest
}: FormInputProps) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      className="w-full p-2 bg-[var(--bg-theme-2)] text-white rounded 1 appearance-none"
      {...rest}
    />
  </div>
);
