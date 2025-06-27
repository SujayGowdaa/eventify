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
  buttonType?: 'submit' | 'button';
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
        type={props.buttonType || 'button'}
        onClick={props.onClick}
        className={`
          ${
            !props.isBtnEvent && color === 'blue'
              ? 'button-blue'
              : 'button-orange'
          }
          ${
            props.isBtnEvent && color === 'blue'
              ? 'button-event-blue'
              : 'button-event-orange'
          }
          ${isOutline && 'button-outline-blue'} 
          ${fullWidth ? 'w-full' : 'max-w-max'} group`}
      >
        {children}
        <FiArrowRightCircle
          className={`${
            !props.isBtnEvent && color === 'blue' && !isOutline && ' text-white'
          } ${
            props.isBtnEvent && color === 'blue' && !isOutline && ' text-white'
          } ${
            isOutline &&
            'text-accent group-hover:text-accent-dark group-active:text-accent-secondary'
          } 
    text-xl`}
        />
      </button>
    );
  }

  return null;
}
