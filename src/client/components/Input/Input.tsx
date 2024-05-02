import { ErrorMessage } from '@hookform/error-message';
import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

type PropsType = {
  name: string;
  text: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ name, text, type }: PropsType) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <label htmlFor={name}>{text}</label>
      <input
        {...register(name)}
        type={type}
      />
      <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => <span>{message}</span>}
      />
    </>
  );
};

export default Input;
