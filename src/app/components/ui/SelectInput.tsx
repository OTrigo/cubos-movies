interface FormSelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}

const SelectInput = ({ label, name, options, ...rest }: FormSelectProps) => {
  return (
    <div className="flex flex-col gap-2 overflow-visible">
      <label
        htmlFor={name}
        className="block text-sm font-medium overflow-visible"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="w-full p-2 bg-[var(--bg-theme-2)] text-[var(--text-default)] rounded 1 appearance-none focus:outline focus:outline-[var(--bg-button-default)] overflow-visible text-[16px]"
        {...rest}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
