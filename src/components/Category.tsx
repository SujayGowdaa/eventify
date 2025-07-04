import Chips from '../ui/Chips';
import Flex from '../ui/Flex';
import type { Event } from '../types/event';

type Props = {
  hideLabel?: boolean;
  handleChange: <T extends keyof Event, U extends Event[T]>(
    field: T,
    value: U
  ) => void;
  formData: Event;
};

export default function Category({
  hideLabel = false,
  handleChange,
  formData,
}: Props) {
  const allCategories = [
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

  function toggleCategory(cat: string) {
    const current = formData.category || [];
    const updated = current.includes(cat)
      ? current.filter((c) => c !== cat)
      : [...current, cat];

    handleChange('category', updated);
  }

  return (
    <Flex className='gap-4'>
      {!hideLabel && (
        <label className='font-medium capitalize text-base-black'>
          explore by category
        </label>
      )}
      <div className='flex gap-4 flex-wrap'>
        {allCategories.map((cat) => (
          <Chips
            key={cat}
            isActive={formData.category?.includes(cat)}
            onClick={() => toggleCategory(cat)}
          >
            {cat}
          </Chips>
        ))}
      </div>
    </Flex>
  );
}
