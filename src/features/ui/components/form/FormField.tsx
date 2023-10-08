import {forwardRef, type ComponentPropsWithoutRef } from "react";

export interface FormFieldProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  error?: string;
}

const FormField = forwardRef<HTMLInputElement,FormFieldProps>(
  ({id, type= 'text',label,placeholder,error,...props},ref) => {
    return <div>
    <label htmlFor={id}>{label}</label>
    <input
    ref={ref}
      id={id}
      placeholder={placeholder}
      type={type}
      {...props}  
    ></input>
    {error && <div>{error}</div>}
  </div>;
  }
);

FormField.displayName = 'FormField';


export default FormField;