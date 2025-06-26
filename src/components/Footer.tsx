export default function Footer() {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Browse Events', href: '/attend' },
    { label: 'Create Event', href: '/create' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const socialLinks = [
    { label: 'Instagram', href: 'https://instagram.com/sujaygowda_' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sujaygowda/' },
    { label: 'GitHub', href: 'https://github.com/SujayGowdaa' },
    {
      label: 'Email',
      href: '  href="https://mail.google.com/mail/?view=cm&fs=1&to=sujaygowda.dev@gmail.com"',
    },
    { label: 'Website', href: 'https://www.sujaygowda.me' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  ];

  const date = new Date();

  return (
    <footer>
      <div className=' pt-16'>
        <div className='flex gap-16 border-t justify-center border-base-medium p-16'>
          <div>
            <h4 className='font-semibold text-base-black mb-2'>Quick Links</h4>
            <ul className='space-y-1'>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className='hover:text-accent text-base-dark'
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className='font-semibold text-base-black mb-2'>
              Stay Connected
            </h4>
            <ul className='space-y-1'>
              {socialLinks.map((link) => {
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className='hover:text-accent text-base-dark'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className='border-t border-base-medium px-4 py-4 text-center text-xs text-base-dark'>
          <div className='flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto'>
            <p>© {date.getFullYear()} Eventify. All rights reserved.</p>
            <div className='flex space-x-4 mt-2 sm:mt-0'>
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className='hover:text-accent '
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
