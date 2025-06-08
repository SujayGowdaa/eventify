import Chips from '../ui/Chips';
import Flex from '../ui/Flex';

export default function Category() {
  const categories = [
    'Conferences & Seminars',
    'Music & Concerts',
    'Workshops & Classes',
    'Educational Events',
    'Exhibitions & Fairs',
    'Sports & Fitness',
    'Networking & Meetups',
    'Parties & Festivals',
    'Charity & Fundraisers',
    'Virtual Events',
    'Tech & Startup Events',
  ];
  // selectedCategory: 'Music & Concerts', // or null if none selected

  // filters: {
  //   location: 'Bangalore', // Default or selected city
  //   startDate: null, // Example: '2025-06-01'
  //   endDate: null, // Example: '2025-06-30'
  // },

  return (
    <Flex className=' gap-4'>
      <label className=' font-medium capitalize text-base-black'>
        explore by category
      </label>
      <div className=' flex gap-4 flex-wrap'>
        {categories.map((chip) => {
          return (
            <Chips key={chip} onClick={() => {}}>
              {chip}
            </Chips>
          );
        })}
      </div>
    </Flex>
  );
}
