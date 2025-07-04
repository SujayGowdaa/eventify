import {
  useEffect,
  useState,
  useRef,
  type Dispatch,
  type SetStateAction,
} from 'react';
import Flex from '../ui/Flex';
import InputRadio from '../ui/InputRadio';
import InputDate from '../ui/InputDate';
import EventDateTimeCard from './EventDateTimeCard';
import EventDateTimeCardRecurring from './EventDateTimeCardRecurring';
import { getDatesBetween } from '../lib/dateUtils';
import type {
  Event,
  OneDayEvent as OneDayEventType,
  RecurringEvent as RecurringEventType,
} from '../types/event';

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
  // --- CHANGE 1: Initialize recurringInput from formData ---
  const [recurringInput, setRecurringInput] = useState(() => {
    if (formData.type === 'recurring_event' && formData.events?.length > 0) {
      const event = formData.events[0] as RecurringEventType;
      return {
        startDate: event.startDate ?? '',
        endDate: event.endDate ?? '',
        startTime: event.startTime ?? '',
        endTime: event.endTime ?? '',
      };
    }
    return {
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
    };
  });

  // --- CHANGE 2: Initialize oneDayInput from formData ---
  const [oneDayInput, setOneDayInput] = useState<OneDayEventType>(() => {
    if (formData.type === 'one_day_event' && formData.events?.length > 0) {
      const event = formData.events[0] as OneDayEventType;
      return {
        type: 'one_day_event', // Make sure type is correctly set
        startDate: event.startDate ?? '',
        startTime: event.startTime ?? '',
        endTime: event.endTime ?? '',
      };
    }
    return {
      type: 'one_day_event',
      startDate: '',
      startTime: '',
      endTime: '',
    };
  });

  const [validationError, setValidationError] = useState('');
  const isInitialMount = useRef(true);
  const justSwitchedTypeRef = useRef(false);

  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  // --- CHANGE 3: Adjust the sync useEffect to NOT run if local state is already synced ---
  useEffect(() => {
    // If we just switched type via radio buttons, the local state will be reset.
    // We want the new type's inputs to remain blank initially, not immediately
    // populated by old formData, so we skip this sync for one render cycle.
    if (justSwitchedTypeRef.current) {
      justSwitchedTypeRef.current = false;
      return;
    }

    // Now, handle the synchronization from formData to local state.
    // This runs on hard reloads or when formData changes (e.g., event deleted)
    // and the type matches.
    if (selectedEventType === 'one_day_event') {
      const event = formData.events?.[0] as OneDayEventType | undefined;
      const newState = {
        type: 'one_day_event',
        startDate: event?.startDate ?? '',
        startTime: event?.startTime ?? '',
        endTime: event?.endTime ?? '',
      };
      // Only update if the local state is genuinely different
      if (JSON.stringify(oneDayInput) !== JSON.stringify(newState)) {
        setOneDayInput(newState);
      }
    } else if (selectedEventType === 'recurring_event') {
      const event = formData.events?.[0] as RecurringEventType | undefined;
      const newState = {
        startDate: event?.startDate ?? '',
        endDate: event?.endDate ?? '',
        startTime: event?.startTime ?? '',
        endTime: event?.endTime ?? '',
      };
      // Only update if the local state is genuinely different
      if (JSON.stringify(recurringInput) !== JSON.stringify(newState)) {
        setRecurringInput(newState);
      }
    }
  }, [selectedEventType, formData.events, formData.type]); // dependencies for this sync effect

  // Push one day input -> formData
  useEffect(() => {
    if (isInitialMount.current) return; // Skip on initial mount

    if (selectedEventType === 'one_day_event') {
      const { startDate, startTime, endTime } = oneDayInput;

      // If inputs are incomplete, ensure formData.events is empty
      if (!startDate || !startTime || !endTime) {
        if (formData.events.length > 0) {
          // Only call handleChange if events array is not already empty
          handleChange('events', []);
        }
        return;
      }

      const newData: OneDayEventType = {
        type: 'one_day_event',
        startDate,
        startTime,
        endTime,
      };

      const currentEventsJson = JSON.stringify(formData.events);
      const newEventsJson = JSON.stringify([newData]);

      // Only call handleChange if the derived events array is truly different
      if (currentEventsJson !== newEventsJson) {
        handleChange('events', [newData]);
      }
    }
  }, [oneDayInput, selectedEventType, handleChange, formData.events]); // formData.events added back here for accurate comparison against current state

  // Push recurring input -> formData
  useEffect(() => {
    if (isInitialMount.current) return; // Skip on initial mount

    if (selectedEventType === 'recurring_event') {
      const { startDate, endDate, startTime, endTime } = recurringInput;

      // If inputs are incomplete, clear validation and ensure formData.events is empty
      if (!startDate || !endDate || !startTime || !endTime) {
        if (formData.events.length > 0) handleChange('events', []);
        setValidationError('');
        return;
      }

      const timeout = setTimeout(() => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {
          setValidationError('End date must be after start date');
          handleChange('events', []);
          return;
        }

        const [sh, sm] = startTime.split(':').map(Number);
        const [eh, em] = endTime.split(':').map(Number);
        const startMins = sh * 60 + sm;
        const endMins = eh * 60 + em;

        if (startDate === endDate && endMins <= startMins) {
          setValidationError('End time must be after start time');
          handleChange('events', []);
          return;
        }

        if (startDate !== endDate && endMins <= startMins) {
          setValidationError('End time must be after start time across days');
          handleChange('events', []);
          return;
        }

        setValidationError('');
        const dates = getDatesBetween(startDate, endDate);
        const recurringEvents = dates.map((date) => ({
          type: 'recurring_event',
          startDate: date,
          endDate,
          startTime,
          endTime,
        }));

        const currentEventsJson = JSON.stringify(formData.events);
        const newEventsJson = JSON.stringify(recurringEvents);

        if (currentEventsJson !== newEventsJson) {
          handleChange('events', recurringEvents);
        }
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [selectedEventType, recurringInput, handleChange, formData.events]); // formData.events added back here for accurate comparison against current state

  // 🗑️ Handle delete for one day
  const handleDeleteOneDay = () => {
    setOneDayInput({
      type: 'one_day_event',
      startDate: '',
      startTime: '',
      endTime: '',
    });
    // This will trigger the oneDayInput pushing effect, which will then set formData.events to []
    // as the inputs become empty.
  };

  return (
    <Flex className='gap-4'>
      {/* Event type selection */}
      <Flex className='gap-4'>
        <label className='input-label'>type</label>
        <Flex className='flex-row gap-8'>
          <InputRadio
            name='event_type'
            id='one day event'
            label='one day event'
            checked={selectedEventType === 'one_day_event'}
            onChange={() => {
              justSwitchedTypeRef.current = true; // Flag that we just switched
              handleChange('type', 'one_day_event');
              handleChange('events', []); // Clear events in parent state immediately
              setSelectedEventType('one_day_event');
              // Reset local oneDayInput state immediately when switching to it
              setOneDayInput({
                type: 'one_day_event',
                startDate: '',
                startTime: '',
                endTime: '',
              });
            }}
          />
          <InputRadio
            name='event_type'
            id='recurring event'
            label='recurring event'
            checked={selectedEventType === 'recurring_event'}
            onChange={() => {
              justSwitchedTypeRef.current = true; // Flag that we just switched
              handleChange('type', 'recurring_event');
              handleChange('events', []); // Clear events in parent state immediately
              setSelectedEventType('recurring_event');
              // Reset local recurringInput state immediately when switching to it
              setRecurringInput({
                startDate: '',
                endDate: '',
                startTime: '',
                endTime: '',
              });
            }}
          />
        </Flex>
      </Flex>

      {/* One day input */}
      {selectedEventType === 'one_day_event' && (
        <Flex className='gap-8'>
          <Flex className='gap-4'>
            <label className='input-label'>date & time</label>
            <Flex className='flex-row gap-4'>
              <InputDate
                type='date'
                label='start date'
                onChange={(e) =>
                  setOneDayInput((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
                value={oneDayInput.startDate}
              />
              <InputDate
                type='time'
                label='start time'
                onChange={(e) =>
                  setOneDayInput((prev) => ({
                    ...prev,
                    startTime: e.target.value,
                  }))
                }
                value={oneDayInput.startTime}
              />
              <InputDate
                type='time'
                label='end time'
                label2='end time'
                onChange={(e) =>
                  setOneDayInput((prev) => ({
                    ...prev,
                    endTime: e.target.value,
                  }))
                }
                value={oneDayInput.endTime}
              />
            </Flex>
          </Flex>
          {oneDayInput.startDate &&
          oneDayInput.startTime &&
          oneDayInput.endTime ? (
            <EventDateTimeCard
              type={'one_day_event'}
              startDate={oneDayInput.startDate}
              startTime={oneDayInput.startTime}
              endTime={oneDayInput.endTime}
              onDelete={handleDeleteOneDay} // Ensure onDelete is passed and used
            />
          ) : (
            <div className='bg-base-light p-8 capitalize text-base-dark rounded-2xl'>
              add date & time to show event
            </div>
          )}
        </Flex>
      )}

      {/* Recurring input */}
      {selectedEventType === 'recurring_event' && (
        <Flex className='gap-8'>
          <Flex className='gap-4'>
            <label className='input-label'>date & time</label>
            <Flex className='flex-row gap-4'>
              <InputDate
                type='date'
                label='start date'
                onChange={(e) =>
                  setRecurringInput((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
                value={recurringInput.startDate}
              />
              <InputDate
                type='date'
                label='end date'
                onChange={(e) =>
                  setRecurringInput((prev) => ({
                    ...prev,
                    endDate: e.target.value,
                  }))
                }
                value={recurringInput.endDate}
              />
              <InputDate
                type='time'
                label='start time'
                onChange={(e) =>
                  setRecurringInput((prev) => ({
                    ...prev,
                    startTime: e.target.value,
                  }))
                }
                value={recurringInput.startTime}
              />
              <InputDate
                type='time'
                label='end time'
                onChange={(e) =>
                  setRecurringInput((prev) => ({
                    ...prev,
                    endTime: e.target.value,
                  }))
                }
                value={recurringInput.endTime}
              />
            </Flex>
          </Flex>
          {validationError && (
            <div className='text-red-600 mt-[-24px]'>{validationError}</div>
          )}
          {formData.events.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3'>
              {formData.events.map((event, index) => (
                <EventDateTimeCardRecurring
                  key={event.startDate + index}
                  type={event.type}
                  startDate={event.startDate}
                  endDate={event.endDate}
                  startTime={event.startTime}
                  endTime={event.endTime}
                  handleChange={handleChange} // This handleChange is likely for an internal delete action if the card supports it
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
