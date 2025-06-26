import { Link } from 'react-router-dom';
import HeroParagraph from '../ui/HeroParagraph';
import HeroTitle from '../ui/HeroTitle';
import InputText from '../ui/InputText';
import Button from '../ui/Button';
import Container from '../ui/Container';
import Flex from '../ui/Flex';
import { FaGoogle } from 'react-icons/fa';

function SignUp() {
  return (
    <Container className=' flex flex-col gap-10 shadow-lg rounded-2xl py-16 px-16 outline-2 outline-base-light'>
      <div>
        <HeroTitle>Join Eventify Sign Up for Free!</HeroTitle>
        <HeroParagraph>
          Create an account to explore, book, and manage events effortlessly.
          Whether you're attending or organizing, Eventify has you covered.
        </HeroParagraph>
      </div>
      <form>
        <Flex className=' gap-12'>
          <Flex className=' gap-8'>
            <div className=' grid grid-cols-2 gap-10'>
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
            </div>
            <InputText
              type='email'
              id='email'
              label='email address'
              placeholder='enter your email'
              onChange={() => {}}
            />
            <div className=' grid grid-cols-2 gap-10'>
              <InputText
                type='password'
                id='password'
                label='password'
                placeholder='enter your password'
                onChange={() => {}}
              />
              <InputText
                type='confirm password'
                id='confirm password'
                label='confirm password'
                placeholder='enter your password again'
                onChange={() => {}}
              />
            </div>
          </Flex>
          <Flex className=' gap-4'>
            <Button fullWidth={true} onClick={() => {}}>
              create account
            </Button>
            <p className=' text-base-dark capitalize'>
              already have an account?{' '}
              <Link className=' text-link' to={'/login'}>
                sign in
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

export default SignUp;
