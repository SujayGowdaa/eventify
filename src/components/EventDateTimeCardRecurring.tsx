import { FaRegTrashAlt } from 'react-icons/fa';
import type { OneDayEvent } from '../types/event';

// Convert "13:30" → "1:30 PM"
function formatTime(time: string): string {
  if (!time) return '';
  const [hourStr, minute] = time.split(':');
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}

// Convert "2025-07-04" → "04 Jul"
function formatDate(date: string): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  });
}

type HandleChange = { handleChange: (path: string, value: any) => void };

export default function EventDateTimeCardRecurring({
  type,
  startDate,
  startTime,
  endDate,
  endTime,
  handleChange,
}: OneDayEvent & HandleChange) {
  return (
    <div className=' max-w-full shadow-md rounded-2xl p-8 flex flex-col gap-4 outline outline-base-light bg-white'>
      <header className='flex justify-between items-center'>
        <h4 className='text-3xl font-semibold text-gradient-blue'>
          {formatDate(startDate)}
        </h4>
        <span className='flex gap-4 items-center'>
          <FaRegTrashAlt
            className='text-2xl text-base-dark hover:text-accent active:text-accent-secondary cursor-pointer'
            onClick={() => {
              handleChange('type', 'recurring_event');
              handleChange('events', []);
            }}
          />
        </span>
      </header>
      <div className='text-base capitalize text-base-dark space-y-2'>
        <p>
          event type :{' '}
          <span className='text-base-black font-medium'>{type}</span>
        </p>
        <p>
          start date :{' '}
          <span className='text-base-black font-medium'>{startDate}</span>
        </p>
        <p>
          end date :{' '}
          <span className='text-base-black font-medium'>{endDate}</span>
        </p>
        <p>
          start time :{' '}
          <span className='text-base-black font-medium'>
            {formatTime(startTime)}
          </span>
        </p>
        <p>
          end time :{' '}
          <span className='text-base-black font-medium'>
            {formatTime(endTime)}
          </span>
        </p>
      </div>
    </div>
  );
}
