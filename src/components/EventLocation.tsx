import type { Dispatch, SetStateAction } from 'react';
import Flex from '../ui/Flex';
import InputDropdown from '../ui/InputDropdown';
import InputRadio from '../ui/InputRadio';
import InputText from '../ui/InputText';

type Props = {
  selectedLocation: 'online' | 'offline' | null;
  setSelectedLocation: Dispatch<SetStateAction<'online' | 'offline' | null>>;
  handleChange: <T extends keyof Event, U extends Event[T]>(
    field: T,
    value: U
  ) => void;
  formData: Event;
};

export default function EventLocation({
  selectedLocation,
  setSelectedLocation,
  handleChange,
  formData,
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
          onChange={() => {
            handleChange('location', 'online');
            handleChange('locationDetails', { link: '' });
            setSelectedLocation('online');
          }}
        />
        <InputRadio
          name='location'
          id='offline'
          label='offline'
          checked={selectedLocation === 'offline'}
          description={'Hosted at a physical venue.'}
          onChange={() => {
            handleChange('location', 'offline');
            handleChange('locationDetails', {
              pincode: 0,
              country: '',
              state: '',
              address: '',
            }); // Clear online link
            setSelectedLocation('offline');
          }}
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
              onChange={(e) =>
                handleChange('locationDetails.pincode', e.target.value)
              }
              value={formData.locationDetails.pincode ?? ''}
            />

            <InputDropdown
              id='country'
              label='country'
              options={[
                { label: '1', value: '23' },
                { label: '1', value: '22' },
              ]}
              onChange={(e) =>
                handleChange('locationDetails.country', e.target.value)
              }
              value={formData.locationDetails.country ?? ''}
            />
          </div>
          <div className=' grid grid-cols-2 gap-8'>
            <InputDropdown
              id='state'
              label='state'
              options={[
                { label: '1', value: '23' },
                { label: '1', value: '22' },
              ]}
              onChange={(e) =>
                handleChange('locationDetails.state', e.target.value)
              }
              value={formData.locationDetails.state ?? ''}
            />
            <InputText
              id='address'
              label='address'
              placeholder='Enter address'
              onChange={(e) =>
                handleChange('locationDetails.address', e.target.value)
              }
              value={formData.locationDetails.address ?? ''}
            />
          </div>
        </>
      )) ||
        (selectedLocation === 'online' && (
          <InputText
            id='event link'
            label='event link'
            placeholder='provide the event link.'
            onChange={(e) =>
              handleChange('locationDetails.link', e.target.value)
            }
            value={formData.locationDetails.link ?? ''}
          />
        ))}
    </Flex>
  );
}
