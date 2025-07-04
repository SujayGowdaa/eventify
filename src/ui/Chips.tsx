import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
};

export default function Chips({ children, isActive, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`${
        isActive
          ? 'button-chips-active bg-accent-secondary outline-accent-secondary-dark'
          : 'button-chips'
      }`}
      type='button'
    >
      {children}
    </button>
  );
}
