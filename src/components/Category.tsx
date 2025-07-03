import Chips from '../ui/Chips';
import Flex from '../ui/Flex';

type Props = {
  hideLabel?: boolean;
  value: string[];
  onChange: (value: string[]) => void;
};

export default function Category({
  hideLabel = false,
  value,
  onChange,
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
    const updated = value.includes(cat)
      ? value.filter((c) => c !== cat)
      : [...value, cat];

    onChange(updated);
  }

  return (
    <Flex className='gap-4'>
      {!hideLabel && (
        <label className='font-medium capitalize text-base-black'>
          explore by category
        </label>
      )}
      <div className='flex gap-4 flex-wrap'>
        {allCategories?.map((cat) => (
          <Chips
            key={cat}
            isActive={value.includes(cat)}
            onClick={() => toggleCategory(cat)}
          >
            {cat}
          </Chips>
        ))}
      </div>
    </Flex>
  );
}
