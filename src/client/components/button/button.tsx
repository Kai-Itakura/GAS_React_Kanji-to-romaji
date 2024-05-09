import { ButtonHTMLAttributes } from 'react';

type PropsType = {
  text: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ text, type }: PropsType) => {
  return <button type={type}>{text}</button>;
};

export default Button;
