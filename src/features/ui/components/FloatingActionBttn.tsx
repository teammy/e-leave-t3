import React, {type ComponentPropsWithRef } from 'react'

export type FloatingActionBttnProps = ComponentPropsWithRef<'button'>;



const FloatingActionBttn = ({
  children,
  className,
  ...props
}: FloatingActionBttnProps) => {
  return (
    <button {...props}>
      {children}
    </button>
  );
};

export default FloatingActionBttn;