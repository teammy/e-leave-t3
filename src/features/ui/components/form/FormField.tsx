import {type ComponentPropsWithoutRef } from "react";

export interface FormFieldProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  name: string;
  error?: string;
}

const FormField = () => {
  return <div>Form Field</div>;
}

export default FormField;