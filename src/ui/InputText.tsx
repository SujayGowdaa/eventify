type Props = {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function InputText({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
}: Props) {
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
        onChange={onChange}
      />
    </div>
  );
}
