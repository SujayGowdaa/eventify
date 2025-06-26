import Links from '../ui/Links';
import logo from '../assets/logo/eventify_logo.png';
import { Link } from 'react-router-dom';

function Navbar() {
  const navbarLinks = [
    { label: 'Home', href: '/' },
    { label: 'Attend Event', href: '/attend-event' },
    { label: 'Create Event', href: '/create-event' },
    { label: 'Contact', href: '/contact' },
    { label: 'Login/Sign Up', href: '/login' },
  ];

  return (
    <nav className=' max-w-[1800px] mx-auto'>
      <div className=' flex justify-between items-center px-8 py-8'>
        <Link to={'/'}>
          <img src={logo} alt='eventify' className=' h-8 w-auto' />
        </Link>
        <ul className=' flex gap-8'>
          {navbarLinks.map((link) => {
            return (
              <li
                key={link.label}
                className=' font-medium capitalize text-base-black hover:text-accent active:text-accent-secondary '
              >
                <Links to={link.href} label={link.label} />
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
