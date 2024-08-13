import React from 'react';
import clsx from 'clsx/lite';

interface ModalProps {
  title?: string;
  footer?: React.ReactNode;
  message?: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export default function Modal({
  open,
  title,
  footer,
  message,
  onClose,
}: ModalProps) {
  return (
    <div
      className={clsx(
        open && 'flex',
        !open && 'hidden',
        'fixed left-0 top-0 z-10 flex h-full w-full items-center overflow-auto bg-black/80',
      )}
    >
      <div className="relative mx-auto my-[10%] h-fit w-[80%] max-w-2xl rounded-[10px] border-[1px] border-solid border-[#888] bg-white leading-relaxed text-black">
        <div className="p-5">
          <span
            className="float-right cursor-pointer text-2xl font-bold leading-none text-[#AAA] hover:text-black focus:text-black"
            onClick={onClose}
          >
            &times;
          </span>
          <h2 className="text-2xl leading-none text-[#333]">{title}</h2>
        </div>
        <div className="utilities-divider" />
        <div className="p-5">
          <div className="text-base text-[#333]">{message}</div>
        </div>
        {footer && (
          <React.Fragment>
            <div className="utilities-divider" />
            <div className="p-5">
              <div className="text-base text-[#333]">{footer}</div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
