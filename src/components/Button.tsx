import classNames from 'classnames';
import React, { ReactElement, ReactNode } from 'react';

type ButtonProps = {
  children?: ReactNode;
  active?: boolean;
  onClick?: () => void;
  label?: string;
  className?: string;
};

export default function Button({ children, active, onClick, label, className }: ButtonProps): ReactElement {
  return (
    <button
      className={classNames(
        'absolute bottom-1 px-2 rounded py-1 ease-linear hover:bg-gray-600 hover:text-white duration-300',
        {
          'bg-gray-600 text-white': active,
          'bg-gray-100 text-black': !active,
          "left-[-30px]": !active,
          "left-2": active
        },
        className
      )}
      onClick={onClick}
      type="button"
    >
      {label}
      {children}
    </button>
  );
}
