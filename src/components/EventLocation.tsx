import type { Dispatch, SetStateAction } from 'react';
import Flex from '../ui/Flex';
import InputDropdown from '../ui/InputDropdown';
import InputRadio from '../ui/InputRadio';
import InputText from '../ui/InputText';

type Props = {
  selectedLocation: 'online' | 'offline' | null;
  setSelectedLocation: Dispatch<SetStateAction<'online' | 'offline' | null>>;
};

export default function EventLocation({
  selectedLocation,
  setSelectedLocation,
}: Props) {
  return (
    <Flex className=' gap-4'>
      <label className='input-label'>location</label>
      <Flex className=' flex-row gap-8'>
        <InputRadio
          name='location'
          id='online'
          label='online'
          checked={selectedLocation === 'online'}
          description={'Conducted virtually using a meeting platform.'}
          onChange={() => setSelectedLocation('online')}
        />
        <InputRadio
          name='location'
          id='offline'
          label='offline'
          checked={selectedLocation === 'offline'}
          description={'Hosted at a physical venue.'}
          onChange={() => setSelectedLocation('offline')}
        />
      </Flex>
      {(selectedLocation === 'offline' && (
        <>
          <div className=' w-full h-[360px] bg-base-light rounded-2xl'>Map</div>
          <div className=' grid grid-cols-2 gap-8'>
            <InputText
              type='number'
              id='pincode'
              label='pincode'
              placeholder='Enter pincode'
            />

            <InputDropdown
              id='country'
              label='country'
              options={[
                { label: '1', value: '23' },
                { label: '1', value: '23' },
              ]}
            />
          </div>
          <div className=' grid grid-cols-2 gap-8'>
            <InputDropdown
              id='state'
              label='state'
              options={[
                { label: '1', value: '23' },
                { label: '1', value: '23' },
              ]}
            />
            <InputText
              id='address'
              label='address'
              placeholder='Enter address'
            />
          </div>
        </>
      )) ||
        (selectedLocation === 'online' && (
          <InputText
            id='event link'
            label='event link'
            placeholder='provide the event link.'
            onChange={() => {}}
          />
        ))}
    </Flex>
  );
}
