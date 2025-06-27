import { useState } from 'react';
import Flex from '../ui/Flex';
import HeroParagraph from '../ui/HeroParagraph';
import HeroTitle from '../ui/HeroTitle';
import InputRadio from '../ui/InputRadio';
import InputText from '../ui/InputText';
import InputTextArea from '../ui/InputTextArea';
import InputDropdown from '../ui/InputDropdown';
import InputDate from '../ui/InputDate';
import Category from '../components/Category';
import EventDateTimeCard from '../components/EventDateTimeCard';
import Button from '../ui/Button';
import { MdOutlineEditCalendar } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';

type Props = {};

export default function CreateEvent({}: Props) {
  const [selected, setSelected] = useState<string>('');
  const [eventType, setEventType] = useState<string>('');

  type FAQ = {
    id: number;
    question: string;
    answer: string;
  };

  type FAQs = FAQ[];
  const [faq, setFaq] = useState<Omit<FAQ, 'id'>>({
    question: '',
    answer: '',
  });
  const [faqs, setFaqs] = useState<FAQs>([]);
  const [isFaqFormOpen, setFaqFormOpen] = useState<boolean>(false);
  console.log(faqs);
  return (
    <Flex className=' gap-10'>
      <Flex className=' gap-0'>
        <HeroTitle>Create Event</HeroTitle>
        <HeroParagraph>
          Easily create and publish your event with all the necessary details.
          Include event information, ticketing, and media to attract attendees.
        </HeroParagraph>
      </Flex>
      <Flex className=' gap-4'>
        <p className=' text-lg font-semibold capitalize text-base-black'>
          cover image{' '}
          <span className=' text-base-dark font-normal '>
            (1920×1080px recommended)
          </span>
        </p>{' '}
        <div className='relative h-[400px] w-full overflow-hidden'>
          {/* Background Image (lower z-index) */}
          <img
            className='absolute inset-0 z-[1] w-full h-full object-cover object-center'
            src='https://placehold.co/2800x2000'
            alt='background'
          />

          {/* Foreground Image (higher z-index, centered) */}
          <img
            className='absolute z-[2] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain'
            src='https://placehold.co/800x420'
            alt='foreground'
          />
        </div>
      </Flex>
      <InputText
        id='name'
        label='name'
        placeholder='give your event a catchy name'
        onChange={() => {}}
      />
      <InputTextArea
        id='description'
        label='description'
        placeholder='Provide detailed information about the event, including the agenda, activities, and special guests. (Minimum 150 characters recommended)'
        onChange={() => {}}
      />
      <Flex className=' gap-4'>
        <label className='input-label'>location</label>
        <Flex className=' flex-row gap-8'>
          <InputRadio
            name='location'
            id='online'
            label='Online'
            checked={selected === 'online'}
            description={'Conducted virtually using a meeting platform.'}
            onChange={() => setSelected('online')}
          />
          <InputRadio
            name='location'
            id='offline'
            label='Offline'
            checked={selected === 'offline'}
            description={'Hosted at a physical venue.'}
            onChange={() => setSelected('offline')}
          />
        </Flex>
        {(selected === 'offline' && (
          <>
            <div className=' w-full h-[360px] bg-base-light rounded-2xl'>
              Map
            </div>
            <div className=' grid grid-cols-2 gap-8'>
              <InputText
                id='address'
                label='address'
                placeholder='Enter address'
                onChange={() => {}}
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
                type='number'
                id='pincode'
                label='pincode'
                placeholder='Enter pincode'
                onChange={() => {}}
              />
            </div>
          </>
        )) ||
          (selected === 'online' && (
            <InputText
              id='event link'
              label='event link'
              placeholder='provide the event link.'
              onChange={() => {}}
            />
          ))}
      </Flex>
      <Flex className=' gap-4'>
        <label className='input-label'>type</label>
        <Flex className=' flex-row gap-8'>
          <InputRadio
            name='event_type'
            id='one day event'
            label='one day event'
            checked={eventType === 'one_day_event'}
            onChange={() => setEventType('one_day_event')}
          />
          <InputRadio
            name='event_type'
            id='recurring event'
            label='recurring event'
            checked={eventType === 'recurring_event'}
            onChange={() => setEventType('recurring_event')}
          />
        </Flex>
      </Flex>
      {(eventType === 'one_day_event' && (
        <Flex className=' gap-8'>
          <Flex className=' gap-4 '>
            <label className='input-label'>date & time</label>
            <Flex className=' flex-row gap-4'>
              <InputDate type='date' label='start date' onChange={() => {}} />
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
      )) ||
        (eventType === 'recurring_event' && (
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
      <Flex className=' gap-4'>
        <label className='input-label'>category</label>
        <Category hideLabel={true} />
      </Flex>
      <Flex className=' gap-4'>
        <label className='input-label'>frequently asked questions (FAQs)</label>
        <Button
          fullWidth={true}
          isOutline={true}
          onClick={() => {
            setFaqFormOpen(!isFaqFormOpen);
          }}
        >
          {!isFaqFormOpen ? 'add FAQ' : 'close FAQ form'}
        </Button>{' '}
      </Flex>{' '}
      {isFaqFormOpen && (
        <form action='' className=' flex flex-col gap-8 rounded-2xl'>
          <Flex className=' gap-4'>
            <InputText
              id='question'
              label='question'
              placeholder='enter question'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFaq((ps) => {
                  return {
                    ...ps,
                    question: e.target.value,
                  };
                });
              }}
              value={faq.question}
            />
            <InputText
              id='answer'
              label='answer'
              placeholder='enter answer'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFaq((ps) => {
                  return {
                    ...ps,
                    answer: e.target.value,
                  };
                });
              }}
              value={faq.answer}
            />
          </Flex>
          <Button
            fullWidth={true}
            onClick={() => {
              if (faq.answer && faq.question) {
                const newFaq: FAQ = {
                  ...faq,
                  id: faqs.length,
                };
                setFaqs((prev) => [...prev, newFaq]);
                setFaq({ question: '', answer: '' });
                setFaqFormOpen(false);
              }
            }}
          >
            add to fAQ
          </Button>
        </form>
      )}
      <div className=' grid grid-cols-2 gap-4'>
        {faqs.map((faq) => {
          return (
            <div
              key={faq.id}
              className=' shadow-md p-4 rounded-lg outline outline-base-light space-y-2'
            >
              <header className=' flex justify-between items-center'>
                <h4 className=' font-semibold text-base-black text-lg'>
                  <span>0{faq.id + 1}. </span>
                  {faq.question}
                </h4>
                <span className=' flex gap-2 items-center'>
                  <MdOutlineEditCalendar className=' text-xl text-base-dark hover:text-accent active:text-accent-secondary cursor-pointer' />
                  <FaRegTrashAlt className=' text-lg text-base-dark hover:text-accent active:text-accent-secondary cursor-pointer' />
                </span>
              </header>
              <p className=' text-base-dark font-normal'>A: {faq.answer}</p>
            </div>
          );
        })}
      </div>
      <div></div>
      <Button fullWidth={true} color='orange' onClick={() => {}}>
        create my event
      </Button>
    </Flex>
  );
}
