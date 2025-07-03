/* eslint-disable no-constant-condition */
import { useState } from 'react';
import Button from '../ui/Button';
import EventCover from '../components/EventCover';
import Category from '../components/Category';
import FAQs from '../components/FAQs';
import EventTicket from '../components/EventTicket';
import EventType from '../components/EventType';
import EventLocation from '../components/EventLocation';
import EventHeader from '../components/EventHeader';
import type { Event } from '../types/event';

export default function CreateEvent() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFaqFormOpen, setFaqFormOpen] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [formData, setFormData] = useState<Event>({
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
  });
  console.log(formData);
  return (
    <form className='flex flex-col gap-10'>
      <EventCover setFormData={setFormData} />

      <EventHeader />

      <EventLocation
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />

      <EventType
        selectedEventType={selectedEventType}
        setSelectedEventType={setSelectedEventType}
      />
      <Category value={selectedCategories} onChange={setSelectedCategories} />

      <EventTicket />

      <FAQs isFaqFormOpen={isFaqFormOpen} setFaqFormOpen={setFaqFormOpen} />

      <Button fullWidth color='orange' buttonType='submit'>
        create my event
      </Button>
    </form>
  );
}
