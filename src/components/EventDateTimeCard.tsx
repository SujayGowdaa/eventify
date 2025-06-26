import { FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineEditCalendar } from 'react-icons/md';

type Props = {};

export default function EventDateTimeCard({}: Props) {
  return (
    <div className=' max-w-[360px] shadow-md rounded-2xl p-8 flex flex-col gap-4 outline outline-base-light'>
      <header className=' flex justify-between items-center'>
        <h4 className=' text-4xl font-semibold text-gradient-blue'>08 Mar</h4>
        <span className=' flex gap-4 items-center'>
          <MdOutlineEditCalendar className=' text-3xl text-base-dark hover:text-accent active:text-accent-secondary cursor-pointer' />
          <FaRegTrashAlt className=' text-2xl text-base-dark hover:text-accent active:text-accent-secondary cursor-pointer' />
        </span>
      </header>
      <div className=' text-base capitalize text-base-dark space-y-2'>
        <p>
          event type :{' '}
          <span className=' text-base-black font-medium'>recurring event</span>
        </p>
        <p>
          start time :{' '}
          <span className=' text-base-black font-medium'>10:00AM</span>
        </p>
        <p>
          end time :{' '}
          <span className=' text-base-black font-medium'>12:00PM</span>
        </p>
      </div>
    </div>
  );
}
