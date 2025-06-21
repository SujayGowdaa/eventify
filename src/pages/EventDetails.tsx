import { FaLocationDot } from 'react-icons/fa6';
import Flex from '../ui/Flex';
import HeroTitle from '../ui/HeroTitle';
import { IoCalendarSharp } from 'react-icons/io5';
import { MdOutlineAccessTimeFilled } from 'react-icons/md';
import { IoMdPeople } from 'react-icons/io';
import Ticket from '../components/Ticket';
import HeroTitleSecondary from '../ui/HeroTitleSecondary';
import Button from '../ui/Button';
import Accordion from '../components/Accordion';

type TicketType = {
  type: 'vip' | 'general';
  price: number;
};

function EventDetails() {
  const tickets: TicketType[] = [
    {
      type: 'vip',
      price: 399,
    },
    {
      type: 'general',
      price: 199,
    },
  ];

  return (
    <Flex className=' gap-10'>
      <div className='relative h-[400px] w-full overflow-hidden'>
        {/* Background Image (lower z-index) */}
        <img
          className='absolute inset-0 z-[1] w-full h-full object-cover object-center'
          src='https://placehold.co/2800x2000'
          alt='background'
        />

        {/* Foreground Image (higher z-index, centered) */}
        <img
          className='absolute z-[2] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain'
          src='https://placehold.co/800x420'
          alt='foreground'
        />
      </div>

      <div>
        <HeroTitle>Tech Conference 2025</HeroTitle>
        <ul className=' flex flex-wrap items-center gap-4 gap-y-0 text-base-dark text-sm mt-[-12px]'>
          <li className=' flex items-center gap-1'>
            <FaLocationDot />
            Grand Hyatt Convention Center, Bengaluru
          </li>
          <li className=' flex items-center gap-1'>
            <IoCalendarSharp />
            March 28, 2025
          </li>
          <li className=' flex items-center gap-1'>
            <MdOutlineAccessTimeFilled />
            10:00 AM
          </li>
          <li className=' flex items-center gap-1'>
            <IoMdPeople />
            100
          </li>
        </ul>
      </div>
      <Flex className=' flex-row gap-8 '>
        {tickets.map((ticket: TicketType) => {
          return (
            <Ticket key={ticket.type} type={ticket.type} price={ticket.price} />
          );
        })}
      </Flex>
      <Flex className=' gap-2'>
        <HeroTitleSecondary>description</HeroTitleSecondary>
        <p className=' text-base-black'>
          Join us for the Tech Innovation Summit 2025, where industry leaders,
          innovators, and entrepreneurs gather to discuss the latest trends in
          technology. From AI breakthroughs to emerging startups, this summit is
          your gateway to the future of tech.
          <br />
          <br />
          The Tech Innovation Summit 2025 is a premier event designed for tech
          enthusiasts, industry experts, and aspiring entrepreneurs. This
          full-day conference will feature-
          <br />
          ▹ Keynote speeches by leading tech innovators.
          <br />
          ▹ Panel discussions on AI, blockchain, and Web 3.0.
          <br />
          ▹ Networking opportunities with startup founders and investors.
          <br />▹ Exclusive product demos from emerging tech companies.
          <br />
          <br />
          Whether youre a tech professional, an entrepreneur, or a student
          passionate about technology, this event offers valuable insights,
          connections, and learning experiences.
        </p>
      </Flex>
      <Flex className=' gap-2'>
        <HeroTitleSecondary>date & time</HeroTitleSecondary>
        <p className=' capitalize text-base-dark flex gap-8'>
          <span>
            starts at:{' '}
            <span className=' text-base-black'>march 28,2025 - 10:00 AM</span>
          </span>
          <span>
            starts at:{' '}
            <span className=' text-base-black'>march 28,2025 - 05:00 PM</span>
          </span>
        </p>
      </Flex>
      <Flex className=' gap-2'>
        <HeroTitleSecondary>location</HeroTitleSecondary>
        <div className=' capitalize text-base-dark flex flex-col gap-8'>
          <span>
            venue:{' '}
            <span className=' text-base-black'>
              Grand Hyatt Convention Center, Bengaluru
            </span>
          </span>
          <div className=' w-full h-[400px] bg-accent/10 rounded-2xl overflow-hidden'></div>
          <Button fullWidth={true} isOutline={true} onClick={() => {}}>
            get direction
          </Button>
        </div>
      </Flex>
      <Flex className=' gap-2'>
        <HeroTitleSecondary>total capacity</HeroTitleSecondary>
        <span className=' capitalize text-base-dark '>
          limit: <span className=' text-base-black'>200 | </span>
          <span className=' text-accent-secondary-dark font-medium'>
            48 seats left
          </span>
        </span>
      </Flex>
      <Flex className=' gap-2'>
        <HeroTitleSecondary>tags</HeroTitleSecondary>
        <span className=' capitalize text-base-dark '>
          categories:{' '}
          <span className=' text-base-black'>
            Technology, AI, Innovation, Networking
          </span>
        </span>
      </Flex>
      <Flex className=' gap-4'>
        <HeroTitleSecondary>FAQs</HeroTitleSecondary>
        <Accordion
          faqs={[
            {
              id: 1,
              question: 'Can I transfer my ticket to someone else?',
              answer:
                'Yes, tickets are transferable up to 24 hours before the event.',
            },
            {
              id: 2,
              question: 'Will food and beverages be available?',
              answer:
                'Yes, food and beverages will be provided throughout the event.',
            },
            {
              id: 3,
              question: 'Are children allowed?',
              answer:
                'Children under 12 are not allowed due to venue safety policies.',
            },
          ]}
        />
      </Flex>
    </Flex>
  );
}

export default EventDetails;
