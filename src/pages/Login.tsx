import { Link } from 'react-router-dom';
import HeroParagraph from '../ui/HeroParagraph';
import HeroTitle from '../ui/HeroTitle';
import InputText from '../ui/InputText';
import Button from '../ui/Button';
import Container from '../ui/Container';
import Flex from '../ui/Flex';
import { FaGoogle } from 'react-icons/fa';

function Login() {
  return (
    <Container className=' flex flex-col gap-10 shadow-lg rounded-2xl py-16 px-16 outline-2 outline-base-light'>
      <Flex className=' gap-0'>
        <HeroTitle>Log in to Eventify</HeroTitle>
        <HeroParagraph>
          Access your personalized dashboard, manage bookings, and discover
          exclusive events.
        </HeroParagraph>
      </Flex>
      <form>
        <Flex className=' gap-12'>
          <Flex className=' gap-8'>
            <InputText
              type='email'
              id='email'
              label='email address'
              placeholder='enter your email'
              onChange={() => {}}
            />
            <Flex className=' gap-4'>
              <InputText
                type='password'
                id='password'
                label='password'
                placeholder='enter your password'
                onChange={() => {}}
              />
              <Link className='text-link' to={'/reset-password'}>
                forgot password?
              </Link>
            </Flex>
          </Flex>
          <Flex className=' gap-4'>
            <Button fullWidth={true} onClick={() => {}}>
              login
            </Button>
            <p className=' text-base-dark capitalize'>
              don't have an account?{' '}
              <Link className=' text-link' to={'/sign-up'}>
                create account
              </Link>
            </p>
          </Flex>
        </Flex>
      </form>
      <div className=' flex items-center gap-4'>
        <p className=' text-base-black capitalize font-medium text-nowrap'>
          or continue with
        </p>
        <div className=' bg-base-dark h-[1px] w-full'></div>
      </div>
      <div className=' group'>
        <Button fullWidth={true} isOutline={true} onClick={() => {}}>
          <span className=' flex items-center gap-2'>
            <FaGoogle className=' text-xl text-accent group-hover:text-accent-dark group-active:text-accent-secondary' />
            login with google
          </span>
        </Button>
      </div>
    </Container>
  );
}

export default Login;
