import type { ReactNode } from 'react';

type Props = {
  onClick: () => void;
  children: ReactNode;
};

export default function Chips({ onClick, children }: Props) {
  return (
    <button
      onClick={onClick}
      className={`${false ? 'button-chips-active' : 'button-chips'}`}
    >
      {children}
    </button>
  );
}
