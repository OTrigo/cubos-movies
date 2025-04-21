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
      className="w-full p-2 bg-[var(--bg-theme-2)] text-[var(--text-default)] rounded resize-none appearance-none max-h-[150px] focus:outline focus:outline-[var(--bg-button-default)] text-[16px]"
      {...rest}
    />
  </div>
);
