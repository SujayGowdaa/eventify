import { useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

type AccordionProps = {
  faqs: FAQItem[];
};

export default function Accordion({ faqs }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // open first by default

  const toggle = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className='border-t border-b border-base-medium/50'>
      <div className='divide-y divide-base-medium/50'>
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          const chevronClass = isOpen
            ? 'text-accent-secondary-dark'
            : 'text-accent-dark';

          return (
            <div key={item.id}>
              <button
                onClick={() => toggle(index)}
                className={` ${
                  isOpen && 'border-b border-base-medium'
                } flex justify-between w-full cursor-pointer p-6`}
              >
                <p className='flex gap-4 font-medium items-center text-base-black px-6 '>
                  <span
                    className={`${
                      isOpen ? 'text-accent-secondary' : 'text-accent'
                    } font-semibold`}
                  >
                    {String(item.id).padStart(2, '0')}
                  </span>
                  {item.question}
                </p>
                <span className={chevronClass}>
                  {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>

              {isOpen && (
                <div className='bg-base-light text-base-dark p-6 px-20'>
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
