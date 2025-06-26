import { useState, type ReactNode } from 'react';

type Props = {
  onClick: () => void;
  children: ReactNode;
};

export default function Chips({ onClick, children }: Props) {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <button
      onClick={() => {
        setIsActive(!isActive);
        onClick();
      }}
      className={`${
        isActive
          ? 'button-chips-active bg-accent-secondary outline-accent-secondary-dark'
          : 'button-chips'
      }`}
    >
      {children}
    </button>
  );
}
