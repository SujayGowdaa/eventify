import { FaRegClock } from 'react-icons/fa';
import { HiOutlineCalendarDateRange } from 'react-icons/hi2';
import { LuMapPin } from 'react-icons/lu';
import { MdCurrencyRupee, MdOutlineCategory } from 'react-icons/md';
import Button from '../ui/Button';

type Props = {
  title: string;
  imageUrl: string;
  location: string;
  date: string;
  time: string;
  category: string;
  price: string;
  onBook: () => void;
};

const Event = ({
  title,
  imageUrl,
  location,
  date,
  time,
  category,
  price,
  onBook,
}: Props) => {
  return (
    <div className='rounded-xl shadow-md bg-white p-4 flex flex-col gap-4 hover:scale-101 transition-all duration-150 hover:shadow-lg outline-2 outline-base-light'>
      <img
        className=' w-auto h-[135px] object-cover object-center rounded-xl'
        src={imageUrl}
        alt={title}
      />
      <h3 className='text-lg font-semibold'>{title}</h3>
      <div className=' space-y-2'>
        <div className='flex items-center gap-2 text-sm text-gray-600'>
          <LuMapPin /> {location}
        </div>
        <div className='flex items-center gap-2 text-sm text-gray-600'>
          <HiOutlineCalendarDateRange /> {date}
        </div>
        <div className='flex items-center gap-2 text-sm text-gray-600'>
          <FaRegClock /> {time}
        </div>
        <div className='flex items-center gap-2 text-sm text-gray-600'>
          <MdOutlineCategory /> {category}
        </div>
        <div className='flex items-center gap-2 text-sm text-gray-600'>
          <MdCurrencyRupee /> {price}
        </div>
      </div>
      <div className=' grow flex items-end'>
        <Button fullWidth={true} onClick={onBook} isBtnEvent={true}>
          Book Tickets
        </Button>
      </div>
    </div>
  );
};

export default Event;
