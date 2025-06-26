type Props = {
  id: string;
  label: string;
  options: {
    label: string;
    value: string;
  }[];
};

export default function InputDropdown({ id, label, options }: Props) {
  return (
    <div className=' flex flex-col gap-4'>
      <label htmlFor={id} className='input-label'>
        {label}
      </label>
      <select className='input-field capitalize'>
        <option value=''>choose an option</option>
        {options.map((opt) => {
          return <option value={opt.value}>{opt.label}</option>;
        })}
      </select>
    </div>
  );
}
