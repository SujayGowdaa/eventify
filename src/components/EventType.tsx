import type { Dispatch, SetStateAction } from 'react';
import Flex from '../ui/Flex';
import InputRadio from '../ui/InputRadio';
import InputDate from '../ui/InputDate';
import EventDateTimeCard from './EventDateTimeCard';
import type { Event } from '../types/event';
import { getDatesBetween } from '../lib/dateUtils';
import { useEffect, useState } from 'react';
import EventDateTimeCardRecurring from './EventDateTimeCardRecurring';

type Props = {
  selectedEventType: 'one_day_event' | 'recurring_event' | null;
  setSelectedEventType: Dispatch<
    SetStateAction<'one_day_event' | 'recurring_event' | null>
  >;
  handleChange: (path: string, value: any) => void;
  formData: Event;
};

export default function EventType({
  selectedEventType,
  setSelectedEventType,
  handleChange,
  formData,
}: Props) {
  const [recurringInput, setRecurringInput] = useState({
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  });
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (
      selectedEventType === 'recurring_event' &&
      formData.events?.length > 0 &&
      !recurringInput.startDate && // avoid overwriting once edited
      !recurringInput.endDate &&
      !recurringInput.startTime &&
      !recurringInput.endTime
    ) {
      const [event] = formData.events;
      setRecurringInput({
        startDate: event.startDate ?? '',
        endDate: event.endDate ?? '',
        startTime: event.startTime ?? '',
        endTime: event.endTime ?? '',
      });
    }
  }, [selectedEventType, formData.events]);

  useEffect(() => {
    if (
      selectedEventType === 'recurring_event' &&
      recurringInput.startDate &&
      recurringInput.endDate &&
      recurringInput.startTime &&
      recurringInput.endTime
    ) {
      const timeout = setTimeout(() => {
        const startDateObj = new Date(recurringInput.startDate);
        const endDateObj = new Date(recurringInput.endDate);

        // Validate date range first
        if (startDateObj > endDateObj) {
          setValidationError('End date must be after or equal to start date');
          return;
        }

        const [startHour, startMin] = recurringInput.startTime
          .split(':')
          .map(Number);
        const [endHour, endMin] = recurringInput.endTime.split(':').map(Number);
        const totalStartMins = startHour * 60 + startMin;
        const totalEndMins = endHour * 60 + endMin;

        if (recurringInput.startDate === recurringInput.endDate) {
          // Same day: end time must be later
          if (totalEndMins <= totalStartMins) {
            setValidationError(
              'End time must be after start time on the same day'
            );
            return;
          }
        } else {
          // Cross-day: end time must still be after start time logically
          if (totalEndMins <= totalStartMins) {
            setValidationError(
              'End time must be after start time even across multiple days'
            );
            return;
          }
        }

        // All validations passed
        setValidationError('');
        const dates = getDatesBetween(
          recurringInput.startDate,
          recurringInput.endDate
        );
        const recurringEvents = dates.map((date) => ({
          type: 'recurring_event',
          startDate: date,
          endDate: recurringInput.endDate,
          startTime: recurringInput.startTime,
          endTime: recurringInput.endTime,
        }));

        handleChange('events', recurringEvents);
      }, 300);

      return () => clearTimeout(timeout);
    } else {
      // Don't trigger handleChange if any input is incomplete
      setValidationError('');
    }
  }, [selectedEventType, recurringInput]);

  return (
    <Flex className='gap-4'>
      <Flex className='gap-4'>
        <label className='input-label'>type</label>
        <Flex className='flex-row gap-8'>
          <InputRadio
            name='event_type'
            id='one day event'
            label='one day event'
            checked={selectedEventType === 'one_day_event'}
            onChange={() => {
              handleChange('type', 'one_day_event');
              handleChange('events', [
                {
                  type: 'one_day_event',
                  startDate: '',
                  startTime: '',
                  endTime: '',
                },
              ]);
              setSelectedEventType('one_day_event');
            }}
          />
          <InputRadio
            name='event_type'
            id='recurring event'
            label='recurring event'
            checked={selectedEventType === 'recurring_event'}
            onChange={() => {
              handleChange('type', 'recurring_event');
              handleChange('events', []);
              setSelectedEventType('recurring_event');
            }}
          />
        </Flex>
      </Flex>

      {selectedEventType === 'one_day_event' && (
        <Flex className='gap-8'>
          <Flex className='gap-4'>
            <label className='input-label'>date & time</label>
            <Flex className='flex-row gap-4'>
              <InputDate
                type='date'
                label='start date'
                onChange={(e) =>
                  handleChange('events.0.startDate', e.target.value)
                }
                value={formData.events?.[0]?.startDate ?? ''}
              />
              <InputDate
                type='time'
                label='start time'
                onChange={(e) =>
                  handleChange('events.0.startTime', e.target.value)
                }
                value={formData.events?.[0]?.startTime ?? ''}
              />
              <InputDate
                type='time'
                label='end time'
                onChange={(e) =>
                  handleChange('events.0.endTime', e.target.value)
                }
                value={formData.events?.[0]?.endTime ?? ''}
              />
            </Flex>
          </Flex>
          {formData.events?.[0]?.type &&
          formData.events?.[0]?.startDate &&
          formData.events?.[0]?.startTime &&
          formData.events?.[0]?.endTime ? (
            <EventDateTimeCard
              type={formData.events?.[0]?.type}
              startDate={formData.events?.[0]?.startDate}
              startTime={formData.events?.[0]?.startTime}
              endTime={formData.events?.[0]?.endTime}
              handleChange={handleChange}
            />
          ) : (
            <div className='bg-base-light p-8 capitalize text-base-dark rounded-2xl'>
              add date & time to show events
            </div>
          )}
        </Flex>
      )}

      {selectedEventType === 'recurring_event' && (
        <Flex className='gap-8'>
          <Flex className='gap-4'>
            <label className='input-label'>date & time</label>
            <Flex className='flex-row gap-4'>
              <InputDate
                type='date'
                label='start date'
                onChange={(e) => {
                  const value = e.target.value;
                  setRecurringInput((prev) => ({
                    ...prev,
                    startDate: value,
                  }));
                  // handleChange('events.0.startDate', value);
                }}
                value={recurringInput.startDate ?? ''}
              />
              <InputDate
                type='date'
                label='end date'
                onChange={(e) => {
                  const value = e.target.value;
                  setRecurringInput((prev) => ({
                    ...prev,
                    endDate: value,
                  }));
                  // handleChange('events.0.endDate', value);
                }}
                value={recurringInput.endDate ?? ''}
              />
              <InputDate
                type='time'
                label='start time'
                onChange={(e) => {
                  const value = e.target.value;
                  setRecurringInput((prev) => ({
                    ...prev,
                    startTime: value,
                  }));
                  // handleChange('events.0.startTime', value);
                }}
                value={recurringInput.startTime ?? ''}
              />
              <InputDate
                type='time'
                label='end time'
                onChange={(e) => {
                  const value = e.target.value;
                  setRecurringInput((prev) => ({
                    ...prev,
                    endTime: value,
                  }));
                  // handleChange('events.0.endTime', value);
                }}
                value={recurringInput.endTime ?? ''}
              />
            </Flex>
          </Flex>{' '}
          {validationError && (
            <div className='text-red-600 mt-[-24px]'>{validationError}</div>
          )}
          {Array.isArray(formData.events) && formData.events.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3'>
              {formData.events.map((event, index) => (
                <EventDateTimeCardRecurring
                  key={event.startDate + index}
                  type={event.type}
                  startDate={event.startDate}
                  endDate={event.endDate}
                  startTime={event.startTime}
                  endTime={event.endTime}
                  handleChange={handleChange}
                />
              ))}
            </div>
          ) : (
            <div className='bg-base-light p-8 capitalize text-base-dark rounded-2xl'>
              add date & time to show events
            </div>
          )}
        </Flex>
      )}
    </Flex>
  );
}
