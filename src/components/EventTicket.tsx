/* eslint-disable no-constant-condition */
import Button from '../ui/Button';
import Flex from '../ui/Flex';
import InputText from '../ui/InputText';
import Modal from '../ui/Modal';
import InputRadio from '../ui/InputRadio';
import { MdOutlineEditCalendar } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';
import type { Ticket } from '../types/event';
import React, { useState } from 'react'; // No need for useEffect here anymore for resetting

// Define the props for EventTicket
interface EventTicketProps {
  handleChange: (path: string, value: any) => void;
  formData: {
    tickets: Ticket[];
  };
}

export default function EventTicket({
  handleChange,
  formData,
}: EventTicketProps) {
  const [isTicketFormOpen, setTicketFormOpen] = useState(false);
  const [ticket, setTicket] = useState<Ticket>({
    id: Date.now(), // Unique ID for each ticket
    ticket: 'general', // Default to 'general'
    ticketType: 'paid', // Default to 'paid'
    quantity: 1,
    price: 0,
  });

  // Removed the useEffect that was resetting the ticket state.
  // The reset will now happen only when "add ticket" button is clicked.

  function handleSetTicket(field: keyof Ticket, value: any) {
    setTicket((prev) => {
      const updatedTicket = {
        ...prev,
        [field]: value,
      };

      // If ticket type is free, set price to 0
      if (field === 'ticketType' && value === 'free') {
        updatedTicket.price = 0;
      }
      return updatedTicket;
    });
  }

  function handleAddTicket(e: React.FormEvent | React.MouseEvent) {
    e.preventDefault();

    // Prevent adding a ticket if the type (general/vip) already exists
    // and it's not the same ticket being edited
    const existingTicketType = formData.tickets.find(
      (t) => t.ticket === ticket.ticket
    );

    if (existingTicketType && existingTicketType.id !== ticket.id) {
      alert(
        `A ${ticket.ticket} ticket has already been added. Please edit the existing one or choose the other type.`
      );
      return;
    }

    // Update formData with the new or updated ticket
    const updatedTickets = formData.tickets.some((t) => t.id === ticket.id)
      ? formData.tickets.map((t) => (t.id === ticket.id ? ticket : t))
      : [...formData.tickets, ticket];

    handleChange('tickets', updatedTickets);
    setTicketFormOpen(false); // Close modal after adding/updating
  }

  function handleCloseModal() {
    setTicketFormOpen(false);
    // Optionally, reset the ticket state here if the user closes the modal without saving
    // setTicket({
    //   id: Date.now(),
    //   ticket: 'general',
    //   ticketType: 'paid',
    //   quantity: 1,
    //   price: 0,
    // });
  }

  function handleEditTicket(ticketToEdit: Ticket) {
    setTicket(ticketToEdit); // This sets the state to the ticket being edited
    setTicketFormOpen(true); // This opens the modal
  }

  function handleDeleteTicket(idToDelete: number) {
    const updatedTickets = formData.tickets.filter((t) => t.id !== idToDelete);
    handleChange('tickets', updatedTickets);
  }

  return (
    <>
      <Flex className='gap-4'>
        <label className='input-label'>ticket</label>
        {formData.tickets.length !== 2 && (
          <Button
            fullWidth={true}
            isOutline={true}
            onClick={() => {
              // When opening the form to ADD a NEW ticket, reset the state
              if (!isTicketFormOpen) {
                // Only reset if the form is currently closed
                setTicket({
                  id: Date.now(),
                  ticket: 'general',
                  ticketType: 'paid',
                  quantity: 1,
                  price: 0,
                });
              }
              setTicketFormOpen(!isTicketFormOpen);
            }}
            isDisabled={formData.tickets.length === 2}
          >
            {!isTicketFormOpen ? 'add ticket' : 'close ticket form'}
          </Button>
        )}
      </Flex>
      {isTicketFormOpen && (
        <Modal onClose={handleCloseModal}>
          <form
            className='flex flex-col gap-8 rounded-2xl bg-white p-12 max-w-3/4 w-full cursor-auto'
            onClick={(e) => e.stopPropagation()}
          >
            <Flex className='gap-4'>
              <label className='input-label'>choose ticket</label>
              <div className='flex gap-8'>
                <InputRadio
                  id='general'
                  name='ticket'
                  label='general'
                  onChange={(e) => {
                    handleSetTicket('ticket', e.target.value);
                  }}
                  checked={ticket?.ticket === 'general'}
                />
                <InputRadio
                  id='vip'
                  name='ticket'
                  label='vip'
                  onChange={(e) => {
                    handleSetTicket('ticket', e.target.value);
                  }}
                  checked={ticket?.ticket === 'vip'}
                />
              </div>
            </Flex>
            <Flex className='gap-4'>
              <label className='input-label'>choose ticket type</label>
              <div className='flex gap-8'>
                <InputRadio
                  id='paid'
                  name='ticketType'
                  label='paid'
                  onChange={(e) => {
                    handleSetTicket('ticketType', e.target.value);
                  }}
                  checked={ticket?.ticketType === 'paid'}
                />
                <InputRadio
                  id='free'
                  name='ticketType'
                  label='free'
                  onChange={(e) => {
                    handleSetTicket('ticketType', e.target.value);
                  }}
                  checked={ticket?.ticketType === 'free'}
                />
              </div>
            </Flex>
            {ticket?.ticketType === 'paid' && (
              <div className='grid grid-cols-2 gap-8'>
                <InputText
                  type={'number'}
                  id='price'
                  label='price'
                  placeholder='in indian RS'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleSetTicket('price', Number(e.target.value));
                  }}
                  value={ticket?.price}
                />
                <InputText
                  type={'number'}
                  id='quantity'
                  label='quantity'
                  label='quantity'
                  placeholder='max ticket availability'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleSetTicket('quantity', Number(e.target.value));
                  }}
                  value={ticket?.quantity}
                />
              </div>
            )}
            {ticket?.ticketType === 'free' && (
              <InputText
                type={'number'}
                id='quantity'
                label='quantity'
                placeholder='max ticket availability'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleSetTicket('quantity', Number(e.target.value));
                }}
                value={ticket?.quantity}
              />
            )}

            <Button
              fullWidth={true}
              onClick={handleAddTicket}
              buttonType='button'
            >
              {ticket.id ? 'update ticket' : 'add ticket'}
            </Button>
          </form>
        </Modal>
      )}
      <div className='grid grid-cols-2 gap-4'>
        {formData.tickets.map((ticket) => {
          return (
            <div
              key={ticket?.id}
              className='shadow-md p-4 rounded-lg outline outline-base-light space-y-4'
            >
              <header className='flex justify-between items-center'>
                <h4
                  className={`${
                    ticket?.ticket === 'vip'
                      ? 'uppercase text-gradient-orange'
                      : 'capitalize text-gradient-blue'
                  } text-3xl font-semibold`}
                >
                  {ticket?.ticket}
                </h4>
                <span className='flex gap-2 items-center'>
                  <MdOutlineEditCalendar
                    className='text-xl text-base-dark hover:text-accent active:text-accent-secondary cursor-pointer'
                    onClick={() => handleEditTicket(ticket)}
                  />
                  <FaRegTrashAlt
                    className='text-lg text-base-dark hover:text-accent active:text-accent-secondary cursor-pointer'
                    onClick={() => handleDeleteTicket(ticket.id)}
                  />
                </span>
              </header>
              <div className='flex flex-col gap-2'>
                <div>
                  <span className='capitalize text-lg text-base-dark font-normal'>
                    quantity :{' '}
                  </span>
                  <span className='font-semibold text-base-black text-xl'>
                    {ticket?.quantity}
                  </span>
                </div>
                <div>
                  <span className='capitalize text-lg text-base-dark font-normal'>
                    price :{' '}
                  </span>
                  <span className='font-semibold text-base-black text-xl'>
                    {ticket?.price === 0 ? (
                      <span className=' capitalize'>free</span>
                    ) : (
                      `₹${ticket.price}`
                    )}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
