import { useRef } from 'react';

type Props = {
  id: string;
  type: 'date' | 'time';
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputDate({ id, type, label, value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function openNativePicker() {
    const input = inputRef.current;
    if (!input) return;
    if ('showPicker' in input) {
      input.showPicker();
    } else {
      input.focus();
      input.click();
    }
  }

  function getMinValue(type: 'date' | 'time') {
    const now = new Date();
    if (type === 'date') return now.toISOString().split('T')[0];
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  }

  function formatTimeTo12Hour(time24: string): string {
    if (!time24) return '';
    const [hourStr, minute] = time24.split(':');
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  }

  return (
    <div
      onClick={openNativePicker}
      className='relative inline-block rounded-full outline outline-base-medium px-4 py-2 text-base-dark max-w-max w-[180px] cursor-pointer select-none text-sm'
    >
      <span className='capitalize'>
        {type === 'time'
          ? value
            ? formatTimeTo12Hour(value)
            : `Choose ${label}`
          : value || `Choose ${label}`}
      </span>
      <input
        id={id}
        ref={inputRef}
        type={type}
        onChange={onChange}
        value={value}
        min={getMinValue(type)}
        className='absolute left-0 top-0 w-full h-full opacity-0'
      />
    </div>
  );
}
