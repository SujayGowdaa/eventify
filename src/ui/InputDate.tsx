import { useRef, useState } from 'react';

type Props = {
  type: 'date' | 'time';
  label: string;
  onChange: () => void;
};

export default function InputDate({ type, label, onChange }: Props) {
  const [dateTime, setDateTime] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  function openNativePicker() {
    const input = inputRef.current;
    if (!input) return;

    if ('showPicker' in input) {
      input.showPicker();
    } else {
      (input as HTMLInputElement).focus();
      (input as HTMLInputElement).click();
    }
  }
  function getMinValue(type: 'date' | 'time') {
    const now = new Date();

    if (type === 'date') {
      // Return YYYY-MM-DD
      return now.toISOString().split('T')[0];
    }

    if (type === 'time') {
      // Return HH:MM (24h format)
      const pad = (n: number) => n.toString().padStart(2, '0');
      return `${pad(now.getHours())}:${pad(now.getMinutes())}`;
    }

    return '';
  }

  function formatTimeTo12Hour(time24: string): string {
    if (!time24) return '';
    const [hourStr, minute] = time24.split(':');
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12;
    if (hour === 0) hour = 12;

    return `${hour}:${minute} ${ampm}`;
  }

  return (
    <div
      onClick={openNativePicker}
      className='relative inline-block rounded-full outline outline-base-medium px-4 py-2 text-base-dark max-w-max w-[180px] cursor-pointer select-none text-sm'
    >
      <span className='capitalize'>
        {type === 'time'
          ? dateTime
            ? formatTimeTo12Hour(dateTime)
            : `Choose ${label}`
          : dateTime || `Choose ${label}`}
      </span>
      <input
        ref={inputRef}
        type={type}
        value={dateTime}
        onChange={(e) => {
          onChange();
          setDateTime(e.target.value);
        }}
        className='absolute left-0 top-0 w-full h-full opacity-0'
        min={getMinValue(type)}
      />
    </div>
  );
}
