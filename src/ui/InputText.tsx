type Props = {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export default function InputText({
  id,
  label,
  type = 'text',
  placeholder,
  onChange,
  value,
}: Props) {
  return (
    <div className=' flex flex-col gap-4'>
      <label htmlFor={id} className='input-label'>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className='input-field'
        value={value}
      />
    </div>
  );
}
