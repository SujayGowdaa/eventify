type Props = {
  id: string;
  label: string;
  options: {
    label: string;
    value: string;
  }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function InputDropdown({
  id,
  label,
  options,
  value,
  onChange,
}: Props) {
  return (
    <div className='flex flex-col gap-4'>
      <label htmlFor={id} className='input-label'>
        {label}
      </label>
      <select
        id={id}
        className='input-field capitalize'
        value={value}
        onChange={onChange}
      >
        <option value=''>choose an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
