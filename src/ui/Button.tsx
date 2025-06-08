import type { ReactNode } from 'react';
import { FiArrowRightCircle } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

type LinkProps = {
  children: ReactNode;
  to: string;
  color?: 'blue' | 'orange';
};

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  color?: 'blue' | 'orange';
  isBtnEvent?: boolean;
};

type Props = LinkProps | ButtonProps;

export default function Button({ children, color = 'blue', ...props }: Props) {
  if ('to' in props) {
    return (
      <RouterLink
        to={props.to}
        className={`${color === 'blue' ? 'button-blue' : 'button-orange'}`}
      >
        {children}
        <FiArrowRightCircle className=' text-xl' />
      </RouterLink>
    );
  }

  if ('onClick' in props) {
    return (
      <button
        onClick={props.onClick}
        className={`${
          props.isBtnEvent
            ? 'button-event-blue'
            : color === 'blue'
            ? 'button-blue'
            : 'button-orange'
        }`}
      >
        {children}
        <FiArrowRightCircle className=' text-xl' />
      </button>
    );
  }

  return null; // fallback if neither provided
}
