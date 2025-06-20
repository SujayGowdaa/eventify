import type { ReactNode } from 'react';
import { FiArrowRightCircle } from 'react-icons/fi';
import { Link as RouterLink } from 'react-router-dom';

type LinkProps = {
  children: ReactNode;
  to: string;
  color?: 'blue' | 'orange';
  fullWidth: boolean;
  isOutline?: boolean;
};

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  color?: 'blue' | 'orange';
  isBtnEvent?: boolean;
  fullWidth: boolean;
  isOutline?: boolean;
};

type Props = LinkProps | ButtonProps;

export default function Button({
  children,
  color = 'blue',
  fullWidth,
  isOutline = false,
  ...props
}: Props) {
  if ('to' in props) {
    return (
      <RouterLink
        to={props.to}
        className={`${color === 'blue' ? 'button-blue' : 'button-orange'} ${
          fullWidth ? 'w-full' : 'max-w-max'
        }`}
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
            ? isOutline
              ? 'button-outline-blue'
              : 'button-blue'
            : isOutline
            ? 'button-outline-orange'
            : 'button-blue'
        } ${fullWidth ? 'w-full' : 'max-w-max'}`}
      >
        {children}
        <FiArrowRightCircle className=' text-xl' />
      </button>
    );
  }

  return null; // fallback if neither provided
}
