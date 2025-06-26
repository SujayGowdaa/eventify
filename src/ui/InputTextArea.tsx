type Props = {
  id: string;
  label: string;
  placeholder: string;
  onChange: () => void;
};

export default function InputTextArea({
  id,
  label,
  placeholder,
  onChange,
}: Props) {
  return (
    <div className=' flex flex-col gap-4'>
      <label htmlFor={id} className='input-label'>
        {label}
      </label>
      <textarea
        className=' input-field-textarea'
        id={id}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
