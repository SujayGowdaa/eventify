import Button from '../ui/Button';

type Props = {
  type: 'vip' | 'general';
  price: number;
};

function Ticket({ type, price }: Props) {
  return (
    <div
      className={` ${
        type === 'vip' ? 'shadow-md hover:shadow-lg' : ' hover:shadow-md'
      } p-6 outline-2 outline-base-light rounded-2xl flex flex-col gap-4 bg-white max-w-[500px] w-full hover:scale-101 duration-150 transition-all cursor-pointer`}
    >
      <div className=' flex justify-between items-center'>
        <h2 className=' uppercase text-2xl font-semibold text-base-black'>
          {type}
        </h2>
        <span
          className={`${
            type === 'vip'
              ? 'text-accent-secondary-dark outline-accent-secondary-dark'
              : 'text-base-dark outline-base-dark'
          } px-3 py-1 capitalize outline rounded-full text-sm font-medium flex items-center justify-center`}
        >
          {type === 'vip' ? 'recommended' : 'best value'}
        </span>
      </div>
      <p className=' capitalize text-base-dark'>
        ticket price :{' '}
        <span className=' text-base-black font-semibold text-lg'>₹{price}</span>
      </p>
      <Button
        fullWidth={true}
        color={type === 'vip' ? 'orange' : 'blue'}
        to='/book-ticket/12'
      >
        book tickets
      </Button>
    </div>
  );
}

export default Ticket;
