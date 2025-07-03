import { useState } from 'react';
import Flex from '../ui/Flex';
import InputText from '../ui/InputText';
import Button from '../ui/Button';
import { MdOutlineEditCalendar } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';
import type { Faq } from '../types/event';
import Modal from '../ui/Modal';
import InputTextArea from '../ui/InputTextArea';

type FAQComponent = {
  isFaqFormOpen: boolean;
  setFaqFormOpen: (isFormOpen: boolean) => void;
};

const defaultFaqs: Faq[] = [
  {
    id: 0,
    question: 'Build type-safe React apps & use TypeScript',
    answer:
      'Enhance your components, state management, Redux & side effects code.',
  },
];

export default function FAQs({ isFaqFormOpen, setFaqFormOpen }: FAQComponent) {
  const [faq, setFaq] = useState<Omit<Faq, 'id'>>({
    question: '',
    answer: '',
  });
  const [faqs, setFaqs] = useState<Faq[]>(defaultFaqs);

  function handleCloseModal() {
    setFaqFormOpen(false);
  }

  return (
    <>
      <Flex className=' gap-4'>
        <label className='input-label'>frequently asked questions (FAQs)</label>
        <Button
          fullWidth={true}
          isOutline={true}
          onClick={() => {
            setFaqFormOpen(!isFaqFormOpen);
          }}
        >
          {!isFaqFormOpen ? 'add FAQ' : 'close FAQ form'}
        </Button>
      </Flex>
      {isFaqFormOpen && (
        <Modal onClose={handleCloseModal}>
          <form
            className=' flex flex-col gap-8 rounded-2xl bg-white p-8 max-w-3/4 w-full cursor-auto'
            action=''
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Flex className=' gap-4'>
              <InputText
                id='question'
                label='question'
                placeholder='enter question'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFaq((ps) => {
                    return {
                      ...ps,
                      question: e.target.value,
                    };
                  });
                }}
                value={faq.question}
              />
              <InputTextArea
                id='answer'
                label='answer'
                placeholder='enter answer'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFaq((ps) => {
                    return {
                      ...ps,
                      answer: e.target.value,
                    };
                  });
                }}
                value={faq.answer}
              />
            </Flex>
            <Button
              fullWidth={true}
              onClick={() => {
                if (faq.answer && faq.question) {
                  const newFaq: Faq = {
                    ...faq,
                    id: faqs.length,
                  };
                  setFaqs((prev) => [...prev, newFaq]);
                  setFaq({ question: '', answer: '' });
                  setFaqFormOpen(false);
                }
              }}
            >
              add to fAQ
            </Button>
          </form>
        </Modal>
      )}
      <div className=' grid grid-cols-2 gap-4'>
        {faqs.map((faq) => {
          return (
            <div
              key={faq.id}
              className=' shadow-md p-4 rounded-lg outline outline-base-light space-y-2'
            >
              <header className=' flex justify-between items-center'>
                <h4 className=' font-semibold text-base-black text-lg'>
                  <span>0{faq.id + 1}. </span>
                  {faq.question}
                </h4>
                <span className=' flex gap-2 items-center'>
                  <MdOutlineEditCalendar className=' text-xl text-base-dark hover:text-accent active:text-accent-secondary cursor-pointer' />
                  <FaRegTrashAlt className=' text-lg text-base-dark hover:text-accent active:text-accent-secondary cursor-pointer' />
                </span>
              </header>
              <p className=' text-base-dark font-normal'>A: {faq.answer}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
