import Flex from '../ui/Flex';

type Props = {
  name: string;
  label: string;
  placeholder: string;
};

export default function SearchInput({ name, label, placeholder }: Props) {
  return (
    <Flex className=' gap-4'>
      <label htmlFor={name} className=' font-medium capitalize text-base-black'>
        {label}
      </label>
      <input
        name={name}
        type='text'
        placeholder={placeholder}
        className=' px-4 py-2 outline outline-base-medium rounded-full text-sm capitalize bg-base-light'
      />
    </Flex>
  );
}
