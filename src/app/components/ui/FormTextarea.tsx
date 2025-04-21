interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
}

export const FormTextarea = ({ label, name, ...rest }: FormTextareaProps) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium">
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      className="w-full p-2 bg-[var(--bg-theme-2)] text-white rounded"
      {...rest}
    />
  </div>
);
