import Flex from '../ui/Flex';

type Props = {};

function BrowseBy({}: Props) {
  return (
    <Flex className=' gap-4'>
      <label className=' font-medium capitalize text-base-black'>
        explore by category
      </label>
      <div className=' flex gap-4 flex-wrap'>
        <select className=' dropdown-chips'>
          <option value=''>choose an option</option>
        </select>
        <select className=' dropdown-chips'>
          <option value=''>choose an option</option>
        </select>
        <input className=' date-chips' type='date' />
        <input className=' date-chips' type='date' />
      </div>
    </Flex>
  );
}

export default BrowseBy;
