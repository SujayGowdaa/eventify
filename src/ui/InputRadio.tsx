type Props = {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  description?: string;
  onChange: () => void;
};

export default function InputRadio({
  id,
  name,
  label,
  checked,
  description,
  onChange,
}: Props) {
  return (
    <div className='flex items-center gap-2'>
      <input
        type='radio'
        id={id}
        name={name}
        value={label}
        checked={checked}
        onChange={onChange}
        className='h-5 w-5 cursor-pointer'
      />
      <label
        htmlFor={id}
        className=' text-base font-medium capitalize text-base-black'
      >
        {label}
      </label>
      {description && <p className=' text-base-dark'>{` : ${description}`}</p>}
    </div>
  );
}
