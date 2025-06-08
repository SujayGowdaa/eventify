import BrowseBy from '../components/BrowseBy';
import Category from '../components/Category';
import Event from '../components/Event';
import SearchInput from '../components/SearchInput';
import Button from '../ui/Button';
import Container from '../ui/Container';
import Flex from '../ui/Flex';

export default function Home() {
  const dummyEvents = [
    {
      title: 'Tech Conference 2025',
      imageUrl: '/images/tech-conference.jpg',
      location: 'Silicon Valley, CA',
      date: 'April 15, 2025',
      time: '10:00 AM - 5:00 PM',
      category: 'Technology',
      price: '$49 (Early Bird)',
    },
    {
      title: 'Startup Expo Bangalore',
      imageUrl: '/images/startup-expo.jpg',
      location: 'Bangalore, India',
      date: 'June 20, 2025',
      time: '9:00 AM - 6:00 PM',
      category: 'Business & Networking',
      price: 'Free',
    },
    {
      title: 'Jazz Night',
      imageUrl: '/images/jazz-night.jpg',
      location: 'New Orleans, LA',
      date: 'July 10, 2025',
      time: '7:00 PM - 10:00 PM',
      category: 'Music & Concerts',
      price: '$25',
    },
    {
      title: 'AI & ML Bootcamp',
      imageUrl: '/images/ai-bootcamp.jpg',
      location: 'Hyderabad, India',
      date: 'August 5–7, 2025',
      time: '10:00 AM - 4:00 PM',
      category: 'Workshops',
      price: '$99',
    },
    {
      title: 'Food & Culture Fest',
      imageUrl: '/images/food-fest.jpg',
      location: 'Mumbai, India',
      date: 'September 15, 2025',
      time: '12:00 PM - 9:00 PM',
      category: 'Culture & Lifestyle',
      price: '₹150',
    },
    {
      title: 'Food & Culture Fest',
      imageUrl: '/images/food-fest.jpg',
      location: 'Mumbai, India',
      date: 'September 15, 2025',
      time: '12:00 PM - 9:00 PM',
      category: 'Culture & Lifestyle',
      price: '₹150',
    },
    {
      title: 'Food & Culture Fest',
      imageUrl: '/images/food-fest.jpg',
      location: 'Mumbai, India',
      date: 'September 15, 2025',
      time: '12:00 PM - 9:00 PM',
      category: 'Culture & Lifestyle',
      price: '₹150',
    },
    {
      title: 'Food & Culture Fest',
      imageUrl: '/images/food-fest.jpg',
      location: 'Mumbai, India',
      date: 'September 15, 2025',
      time: '12:00 PM - 9:00 PM',
      category: 'Culture & Lifestyle',
      price: '₹150',
    },
  ];

  return (
    <header>
      <Container className=' flex flex-col items-center text-center gap-6'>
        <div>
          <h1 className='text-6xl font-brand text-gradient-orange'>
            Discover. Create. Experience.
          </h1>
          <p className=' text-lg text-base-black mt-[-0.5rem]'>
            Eventify makes it easy to discover, create, and manage events – all
            in one place.
          </p>
        </div>
        <Button to='/'>step into the world of events</Button>
      </Container>
      <Container>
        <Flex>
          <SearchInput
            name='searchEvent'
            label='find events that inspire you!'
            placeholder='Search by event name'
          />
          <Category />
          <BrowseBy />
          <p className=' capitalize text-sm text-base-dark'>
            results »{' '}
            <span className=' text-accent-dark font-medium text-base'>
              23 events found!
            </span>
          </p>

          <div className=' grid grid-cols-4 xl:grid-cols-5 gap-8'>
            {dummyEvents.map((event, index) => {
              const { title, imageUrl, location, date, time, category, price } =
                event;
              return (
                <Event
                  key={index}
                  title={title}
                  imageUrl={'https://placehold.co/200x135'}
                  location={location}
                  date={date}
                  time={time}
                  category={category}
                  price={price}
                  onBook={() => {}}
                />
              );
            })}
          </div>
        </Flex>
      </Container>
    </header>
  );
}
