import Button from '../ui/Button';
import Container from '../ui/Container';
import Flex from '../ui/Flex';
import HeroParagraph from '../ui/HeroParagraph';
import HeroTitle from '../ui/HeroTitle';
import InputText from '../ui/InputText';

type Props = {};

function BookEvent({}: Props) {
  return (
    <Container>
      <Flex>
        <div>
          <HeroTitle>Secure Your Spot at the Event</HeroTitle>
          <HeroParagraph>
            You re just a few steps away from reserving your ticket. Complete
            the checkout process to confirm your booking.
          </HeroParagraph>
        </div>
        <Flex className=' flex-row shadow-lg rounded-2xl outline-2 outline-base-light overflow-hidden'>
          <div className=' flex flex-col gap-4 p-8 bg-base-light/50 max-w-[400px] w-full'>
            <img
              src='https://placehold.co/2800x2000'
              alt='background'
              className=' rounded-xl object-cover object-center max-h-[225px] w-full'
            />
            <div>
              <h3 className=' text-accent font-semibold text-lg'>
                Tech Conference 2025
              </h3>
              <span className=' text-base-black'>
                March 28, 2025 – 10:00 AM 5:00 PM
              </span>
            </div>
            <div className=' flex justify-between'>
              <span className=' text-base-dark'>Ticket Price:</span>
              <span className=' font-medium text-base-black'>299.00</span>
            </div>
            <div className=' flex justify-between'>
              <span className=' text-base-dark'>Tickets Selected:</span>
              <span className=' font-medium text-base-black'>2</span>
            </div>
            <div className=' flex justify-between'>
              <span className=' text-base-dark'>Subtotal:</span>
              <span className=' font-medium text-base-black'>
                299.00 <span className=' text-base-dark'>×</span> 2{' '}
                <span className=' text-base-dark'>=</span> 598.00
              </span>
            </div>
            <div className=' h-[1px] bg-base-medium '></div>
            <div className=' flex justify-between text-base-black '>
              <span>Total Amount: </span>
              <span className=' font-semibold text-accent'>₹598.00</span>
            </div>
          </div>
          <form action='' className=' w-full p-8 grow'>
            <Flex className=' gap-12 h-full'>
              <Flex>
                <InputText
                  type='text'
                  id='firstName'
                  label='first name'
                  placeholder='enter your first name'
                  onChange={() => {}}
                />
                <InputText
                  type='text'
                  id='lastName'
                  label='last name'
                  placeholder='enter your last name'
                  onChange={() => {}}
                />
                <InputText
                  type='email'
                  id='email'
                  label='email address'
                  placeholder='enter your email'
                  onChange={() => {}}
                />
              </Flex>
              <Button fullWidth={true} onClick={() => {}}>
                place order
              </Button>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </Container>
  );
}

export default BookEvent;
