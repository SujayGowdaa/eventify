type Props = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function InputTextArea({
  id,
  label,
  placeholder,
  value,
  onChange,
}: Props) {
  return (
    <div className='flex flex-col gap-4'>
      <label htmlFor={id} className='input-label'>
        {label}
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        className='input-field-textarea'
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
