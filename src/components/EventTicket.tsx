import Button from '../ui/Button';
import Flex from '../ui/Flex';
import InputText from '../ui/InputText';
import Modal from '../ui/Modal';
import InputRadio from '../ui/InputRadio';
import { MdOutlineEditCalendar } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';
import type { Ticket } from '../types/event';
import React, { useState } from 'react';

export default function EventTicket() {
  const [isTicketFormOpen, setTicketFormOpen] = useState(false);
  const [ticket, setTicket] = useState<Ticket | null>({
    id: 1,
    ticket: 'vip',
    ticketType: 'free',
    quantity: 1,
    price: 1,
  });
  const [tickets, setTickets] = useState<Ticket[]>([]);

  function handleSetTicket(field, value) {
    setTicket((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.stopPropagation();
    e.preventDefault();
  }

  function handleCloseModal() {
    setTicketFormOpen(false);
  }

  return (
    <>
      <Flex className=' gap-4'>
        <label className='input-label'>ticket</label>
        <Button
          fullWidth={true}
          isOutline={true}
          onClick={() => {
            setTicketFormOpen(!isTicketFormOpen);
          }}
        >
          {!isTicketFormOpen ? 'add ticket' : 'close ticket form'}
        </Button>
      </Flex>
      {isTicketFormOpen && (
        <Modal onClose={handleCloseModal}>
          <form
            className=' flex flex-col gap-8 rounded-2xl bg-white p-8 max-w-3/4 w-full cursor-auto'
            action=''
            onClick={handleSubmit}
          >
            <Flex className=' gap-4'>
              <label className='input-label'>choose ticket</label>
              <div className=' flex gap-8'>
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
                  id='VIP'
                  name='ticket'
                  label='VIP'
                  onChange={(e) => {
                    handleSetTicket('ticket', e.target.value);
                  }}
                  checked={ticket?.ticket === 'vip'}
                />
              </div>
            </Flex>
            <Flex className=' gap-4'>
              <label className='input-label'>choose ticket type</label>
              <div className=' flex gap-8'>
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
            {(ticket?.ticketType === 'paid' && (
              <div className=' grid grid-cols-2 gap-8'>
                <InputText
                  type={'number'}
                  id='price'
                  label='price'
                  placeholder='in indian RS'
                  onChange={(e: FormEvent) => {
                    handleSetTicket('price', e.target.value);
                  }}
                  value={ticket?.price}
                />
                <InputText
                  type={'number'}
                  id='quantity'
                  label='quantity'
                  placeholder='max ticket availability'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleSetTicket('price', e.target.value);
                  }}
                  value={ticket?.quantity}
                />
              </div>
            )) ||
              (ticket?.ticketType === 'free' && (
                <InputText
                  type={'number'}
                  id='quantity'
                  label='quantity'
                  placeholder='max ticket availability'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleSetTicket('quantity', e.target.value);
                  }}
                  value={ticket?.quantity}
                />
              ))}

            <Button fullWidth={true} onClick={() => {}}>
              add ticket
            </Button>
          </form>
        </Modal>
      )}
      <div className=' grid grid-cols-2 gap-4'>
        {tickets.map((ticket) => {
          return (
            <div
              key={ticket?.id}
              className=' shadow-md p-4 rounded-lg outline outline-base-light space-y-4'
            >
              <header className=' flex justify-between items-center'>
                <h4
                  className={`${
                    ticket?.ticket === 'vip'
                      ? 'uppercase text-gradient-orange'
                      : 'capitalize text-gradient-blue'
                  } text-3xl font-semibold`}
                >
                  {ticket?.ticket}
                </h4>
                <span className=' flex gap-2 items-center'>
                  <MdOutlineEditCalendar className=' text-xl text-base-dark hover:text-accent active:text-accent-secondary cursor-pointer' />
                  <FaRegTrashAlt className=' text-lg text-base-dark hover:text-accent active:text-accent-secondary cursor-pointer' />
                </span>
              </header>
              <div className=' flex flex-col gap-2'>
                <div>
                  <span className=' capitalize text-lg text-base-dark font-normal'>
                    quantity :{' '}
                  </span>
                  <span className=' font-semibold text-base-black text-xl'>
                    {ticket?.quantity}
                  </span>
                </div>
                <div>
                  <span className=' capitalize text-lg text-base-dark font-normal'>
                    price :{' '}
                  </span>
                  <span className=' font-semibold text-base-black text-xl'>
                    ₹{ticket?.price}
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
