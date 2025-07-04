/* eslint-disable no-constant-condition */
import { useState } from 'react';
import Flex from '../ui/Flex';
import InputText from '../ui/InputText';
import Button from '../ui/Button';
import { MdOutlineEditCalendar } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';
import type { Faq } from '../types/event';
import Modal from '../ui/Modal';
import InputTextArea from '../ui/InputTextArea';

// Define the props for the FAQs component
interface FAQComponentProps {
  handleChange: (path: string, value: any) => void;
  formData: {
    faqs: Faq[];
  };
}

export default function FAQs({ handleChange, formData }: FAQComponentProps) {
  const [isFaqFormOpen, setFaqFormOpen] = useState(false);
  // State to manage the current FAQ being added or edited
  const [faq, setFaq] = useState<Faq>({
    id: Date.now(), // Unique ID for new FAQ
    question: '',
    answer: '',
  });

  // Handler to update the current FAQ state
  function handleSetFaq(field: keyof Faq, value: string) {
    setFaq((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  // Handler to add or update an FAQ in formData
  function handleAddOrUpdateFaq(e: React.FormEvent) {
    e.preventDefault(); // Prevent default form submission

    if (!faq.question || !faq.answer) {
      alert('Please fill in both question and answer.');
      return;
    }

    // Check if the FAQ is being edited (has an existing id)
    const isEditing = formData.faqs.some((f) => f.id === faq.id);

    let updatedFaqs: Faq[];
    if (isEditing) {
      // If editing, map over existing FAQs and update the matching one
      updatedFaqs = formData.faqs.map((f) => (f.id === faq.id ? faq : f));
    } else {
      // If adding a new FAQ, append it to the array
      updatedFaqs = [...formData.faqs, { ...faq, id: Date.now() }]; // Ensure new ID for new FAQ
    }

    handleChange('faqs', updatedFaqs); // Update the formData in the parent component
    setFaq({ id: Date.now(), question: '', answer: '' }); // Reset form for new entry
    setFaqFormOpen(false); // Close the modal
  }

  // Handler to close the modal
  function handleCloseModal() {
    setFaqFormOpen(false);
    // Optionally reset the form if the user closes without saving
    setFaq({ id: Date.now(), question: '', answer: '' });
  }

  // Handler to prefill the form for editing an FAQ
  function handleEditFaq(faqToEdit: Faq) {
    setFaq(faqToEdit); // Set the form state with the FAQ to be edited
    setFaqFormOpen(true); // Open the modal
  }

  // Handler to delete an FAQ
  function handleDeleteFaq(idToDelete: number) {
    const updatedFaqs = formData.faqs.filter((f) => f.id !== idToDelete);
    handleChange('faqs', updatedFaqs); // Update the formData in the parent component
  }

  return (
    <>
      <Flex className='gap-4'>
        <label className='input-label'>frequently asked questions (FAQs)</label>
        <Button
          fullWidth={true}
          isOutline={true}
          onClick={() => {
            // Reset the form only when opening to add a new FAQ
            if (!isFaqFormOpen) {
              setFaq({ id: Date.now(), question: '', answer: '' });
            }
            setFaqFormOpen(!isFaqFormOpen);
          }}
        >
          {!isFaqFormOpen ? 'add FAQ' : 'close FAQ form'}
        </Button>
      </Flex>
      {isFaqFormOpen && (
        <Modal onClose={handleCloseModal}>
          <form
            className='flex flex-col gap-8 rounded-2xl bg-white p-8 max-w-3/4 w-full cursor-auto'
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside the form
          >
            <Flex className='gap-4'>
              <InputText
                id='question'
                label='question'
                placeholder='enter question'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleSetFaq('question', e.target.value);
                }}
                value={faq.question}
              />
              <InputTextArea
                id='answer'
                label='answer'
                placeholder='enter answer'
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  // Changed to HTMLTextAreaElement
                  handleSetFaq('answer', e.target.value);
                }}
                value={faq.answer}
              />
            </Flex>
            <Button fullWidth={true} onClick={handleAddOrUpdateFaq}>
              {faq.id && formData.faqs.some((f) => f.id === faq.id)
                ? 'update FAQ'
                : 'add to FAQ'}
            </Button>
          </form>
        </Modal>
      )}
      {formData.faqs.length > 0 && (
        <div className='grid grid-cols-2 gap-4'>
          {formData.faqs.map((faqItem, index) => {
            return (
              <div
                key={faqItem.id}
                className='shadow-md p-4 rounded-lg outline outline-base-light space-y-2'
              >
                <header className='flex justify-between items-center'>
                  <h4 className='font-semibold text-base-black text-lg'>
                    <span>{index + 1}. </span>{' '}
                    {/* Use index for display numbering */}
                    {faqItem.question}
                  </h4>
                  <span className='flex gap-2 items-center'>
                    <MdOutlineEditCalendar
                      className='text-xl text-base-dark hover:text-accent active:text-accent-secondary cursor-pointer'
                      onClick={() => handleEditFaq(faqItem)}
                    />
                    <FaRegTrashAlt
                      className='text-lg text-base-dark hover:text-accent active:text-accent-secondary cursor-pointer'
                      onClick={() => handleDeleteFaq(faqItem.id)}
                    />
                  </span>
                </header>
                <p className='text-base-dark font-normal'>
                  A: {faqItem.answer}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
