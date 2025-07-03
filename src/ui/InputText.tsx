type Props = {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string | number;
  onChange: (value: string | number) => void;
};

export default function InputText({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const finalValue = type === 'number' ? Number(raw) : raw;
    onChange(finalValue);
  };

  return (
    <div className='flex flex-col gap-4'>
      <label htmlFor={id} className='input-label'>
        {label}
      </label>
      <input
        id={id}
        className='input-field'
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
