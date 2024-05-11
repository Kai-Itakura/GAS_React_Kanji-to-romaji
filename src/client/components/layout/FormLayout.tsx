import { ReactNode } from 'react';

type FormLayoutProps = {
  children: ReactNode;
};

const FormLayout = ({ children }: FormLayoutProps) => {
  return <div className='flex justify-center items-center w-full h-full gap-10 mt-10 tablet:flex-col'>{children}</div>;
};

export default FormLayout;
