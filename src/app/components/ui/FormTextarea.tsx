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
      className="w-full p-2 bg-[#1a191b] text-white rounded"
      {...rest}
    />
  </div>
);
