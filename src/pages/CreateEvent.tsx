/* eslint-disable no-constant-condition */
import { useEffect, useState } from 'react';
import EventHeader from '../components/EventHeader';
import EventCover from '../components/EventCover';
import Button from '../ui/Button';
import Category from '../components/Category';
import FAQs from '../components/FAQs';
import EventTicket from '../components/EventTicket';
import EventType from '../components/EventType';
import EventLocation from '../components/EventLocation';
import type { Event } from '../types/event';

function getDefaultEvent(): Event {
  return {
    type: '',
    location: '',
    locationDetails: {
      link: '',
    },
    events: [],
    name: '',
    image: '',
    description: '',
    category: [],
    tickets: [],
    faqs: [],
    coverImage: null,
  };
}

export default function CreateEvent() {
  const [formData, setFormData] = useState<Event>(() => {
    const storedEventDetails = localStorage.getItem('event');

    if (storedEventDetails) {
      const parsedData: Event = JSON.parse(storedEventDetails);
      return parsedData;
    } else {
      return getDefaultEvent();
    }
  });
  const [selectedLocation, setSelectedLocation] = useState(
    formData.location || ''
  );
  const [selectedEventType, setSelectedEventType] = useState(
    formData.type || ''
  );
  // const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // const [isFaqFormOpen, setFaqFormOpen] = useState(false);

  function handleChange(path: string, value: any) {
    setFormData((prev) => {
      const keys = path.split('.');
      const updated = { ...prev };

      let curr: any = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        curr[keys[i]] = { ...curr[keys[i]] };
        curr = curr[keys[i]];
      }

      curr[keys[keys.length - 1]] = value;
      return updated;
    });
  }

  useEffect(() => {
    localStorage.setItem('event', JSON.stringify(formData));
  }, [formData]);

  console.log(formData);

  return (
    <form className='flex flex-col gap-10'>
      <EventCover handleChange={handleChange} formData={formData} />

      <EventHeader handleChange={handleChange} formData={formData} />

      <EventLocation
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        handleChange={handleChange}
        formData={formData}
      />

      <EventType
        selectedEventType={selectedEventType}
        setSelectedEventType={setSelectedEventType}
        handleChange={handleChange}
        formData={formData}
      />

      {/* <Category value={selectedCategories} onChange={setSelectedCategories} /> */}

      {/* <EventTicket /> */}

      {/* <FAQs isFaqFormOpen={isFaqFormOpen} setFaqFormOpen={setFaqFormOpen} /> */}

      {/* <Button fullWidth color='orange' buttonType='submit'>
        create my event
      </Button> */}
    </form>
  );
}
