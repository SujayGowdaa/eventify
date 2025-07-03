import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ children, onClose }: ModalProps) {
  const modalRoot = document.getElementById('modal');

  if (!modalRoot) {
    console.error("The 'modal' element was not found in the DOM.");
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className=' bg-base-black/50 backdrop-blur-xs fixed top-0 left-0 z-20 flex items-center justify-center h-screen w-screen cursor-pointer'
      onClick={onClose}
    >
      {children}
    </div>,
    modalRoot
  );
}
