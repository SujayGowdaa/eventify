import Flex from '../ui/Flex';
import Category from './Category';

export default function EventCategory() {
  return (
    <Flex className=' gap-4'>
      <label className='input-label'>category</label>
      <Category hideLabel={true} />
    </Flex>
  );
}
