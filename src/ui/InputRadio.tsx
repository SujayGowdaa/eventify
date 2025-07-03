type Props = {
  id: string;
  name: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputRadio({
  id,
  name,
  label,
  description,
  checked,
  onChange,
}: Props) {
  return (
    <div className='flex items-center gap-2 max-w-max'>
      <input
        type='radio'
        id={id}
        name={name}
        value={label}
        className='h-5 w-5 cursor-pointer'
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className='text-base font-medium capitalize text-base-black cursor-pointer'
      >
        {label}
      </label>
      {description && <p className='text-base-dark'>{` : ${description}`}</p>}
    </div>
  );
}
