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
    const stored = localStorage.getItem('event');
    return stored ? JSON.parse(stored) : getDefaultEvent();
  });

  // --- CHANGE 1: Use an array for error messages ---
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  // Save to localStorage on formData change
  useEffect(() => {
    localStorage.setItem('event', JSON.stringify(formData));
  }, [formData]);

  // Generic form change handler
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
    // --- CHANGE 2: Clear all errors when form is edited ---
    setErrorMessages([]);
  }

  const handleCreateEvent = () => {
    // --- CHANGE 3: Initialize an empty array for current errors ---
    const currentErrors: string[] = [];

    // --- CHANGE 4: Collect all errors without returning ---
    if (!formData.name.trim()) {
      currentErrors.push('Please enter an event name.');
    }
    if (!formData.description.trim()) {
      currentErrors.push('Please enter an event description.');
    }
    if (!formData.type.trim()) {
      currentErrors.push('Please select an event type.');
    }
    if (!formData.location.trim()) {
      currentErrors.push('Please select an event location.');
    }
    // Check for specific location details based on selected type
    if (
      formData.location === 'online' &&
      !formData.locationDetails.link.trim()
    ) {
      currentErrors.push('Please add event link for online event.');
    }
    // You'll need to add similar checks for offline location details (pincode, address, etc.)
    // For example:
    /*
    if (formData.location === 'offline') {
        const offlineDetails = formData.locationDetails as LocationDetailsOffline;
        if (!offlineDetails.address.trim()) {
            currentErrors.push('Please enter the event address.');
        }
        if (!offlineDetails.pincode) { // Or a more robust check for number
            currentErrors.push('Please enter the event pincode.');
        }
        if (!offlineDetails.country.trim()) {
            currentErrors.push('Please enter the event country.');
        }
        if (!offlineDetails.state.trim()) {
            currentErrors.push('Please enter the event state.');
        }
    }
    */

    if (formData.events.length === 0) {
      currentErrors.push('Please add at least one event date.');
    }
    if (formData.category.length === 0) {
      currentErrors.push('Please select at least one category.');
    }
    if (formData.tickets.length === 0) {
      currentErrors.push('Please add at least one ticket type.');
    }
    if (!formData.coverImage) {
      currentErrors.push('Please upload a cover image.');
    }

    // --- CHANGE 5: Update the errorMessages state ---
    if (currentErrors.length > 0) {
      setErrorMessages(currentErrors);
      // Don't proceed if there are errors
      return;
    }

    // If no errors, proceed with success logic
    console.log('✅ Final Event Data:', formData);
    alert('Event data is valid and saved!');
  };

  return (
    <form className='flex flex-col gap-10' onSubmit={(e) => e.preventDefault()}>
      <EventCover handleChange={handleChange} formData={formData} />

      <EventHeader handleChange={handleChange} formData={formData} />

      <EventLocation
        selectedLocation={formData.location}
        setSelectedLocation={(value: string) => handleChange('location', value)}
        handleChange={handleChange}
        formData={formData}
      />

      <EventType
        selectedEventType={
          formData.type as 'one_day_event' | 'recurring_event' | null
        }
        setSelectedEventType={(type) => handleChange('type', type)}
        handleChange={handleChange}
        formData={formData}
      />

      <Category handleChange={handleChange} formData={formData} />

      <EventTicket handleChange={handleChange} formData={formData} />

      <FAQs
        isFaqFormOpen={false}
        setFaqFormOpen={() => {}}
        handleChange={handleChange}
        formData={formData}
      />

      {errorMessages.length > 0 && (
        <div className='text-red-600 font-medium'>
          {errorMessages.map((msg, index) => (
            <div className=' flex gap-1'>
              <span>{index + 1 < 10 ? `0${index + 1}` : index + 1}.</span>
              <p key={index}>{msg}</p>
            </div>
          ))}
        </div>
      )}

      <Button fullWidth color='orange' onClick={handleCreateEvent}>
        create my event
      </Button>
    </form>
  );
}
