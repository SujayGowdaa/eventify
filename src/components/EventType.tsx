import type { Dispatch, SetStateAction } from 'react';
import Flex from '../ui/Flex';
import InputRadio from '../ui/InputRadio';
import InputDate from '../ui/InputDate';
import EventDateTimeCard from './EventDateTimeCard';

type Props = {
  selectedEventType: 'one_day_event' | 'recurring_event' | null;
  setSelectedEventType: Dispatch<
    SetStateAction<'one_day_event' | 'recurring_event' | null>
  >;
};

export default function EventType({
  selectedEventType,
  setSelectedEventType,
}: Props) {
  return (
    <Flex className=' gap-4'>
      <Flex className=' gap-4'>
        <label className='input-label'>type</label>
        <Flex className=' flex-row gap-8'>
          <InputRadio
            name='event_type'
            id='one day event'
            label='one day event'
            checked={selectedEventType === 'one_day_event'}
            onChange={() => setSelectedEventType('one_day_event')}
          />
          <InputRadio
            name='event_type'
            id='recurring event'
            label='recurring event'
            checked={selectedEventType === 'recurring_event'}
            onChange={() => setSelectedEventType('recurring_event')}
          />
        </Flex>
      </Flex>
      {(selectedEventType === 'one_day_event' && (
        <Flex className=' gap-8'>
          <Flex className=' gap-4 '>
            <label className='input-label'>date & time</label>
            <Flex className=' flex-row gap-4'>
              <InputDate
                type='date'
                label='start date'
                onChange={() => {}}
                value={''}
              />
              <InputDate
                type='time'
                label='start time'
                onChange={() => {}}
                value={''}
              />
              <InputDate
                type='time'
                label='end time'
                onChange={() => {}}
                value={''}
              />
            </Flex>
          </Flex>
          {true ? (
            <EventDateTimeCard />
          ) : (
            <div className=' bg-base-light p-8  capitalize text-base-dark rounded-2xl'>
              add date & time to show events
            </div>
          )}
        </Flex>
      )) ||
        (selectedEventType === 'recurring_event' && (
          <Flex className=' gap-8'>
            <Flex className=' gap-4 '>
              <label className='input-label'>date & time</label>
              <Flex className=' flex-row gap-4'>
                <InputDate type='date' label='start date' onChange={() => {}} />
                <InputDate type='date' label='end date' onChange={() => {}} />
                <InputDate type='time' label='start time' onChange={() => {}} />
                <InputDate type='time' label='end time' onChange={() => {}} />
              </Flex>
            </Flex>
            {true ? (
              <EventDateTimeCard />
            ) : (
              <div className=' bg-base-light p-8  capitalize text-base-dark rounded-2xl'>
                add date & time to show events
              </div>
            )}
          </Flex>
        ))}
    </Flex>
  );
}
