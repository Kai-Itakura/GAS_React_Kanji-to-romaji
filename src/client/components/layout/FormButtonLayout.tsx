import { ReactNode } from 'react';

type FormButtonLayoutProps = {
  children: ReactNode;
};

const FormButtonLayout = ({ children }: FormButtonLayoutProps) => {
  return <div className='flex justify-between items-center tablet:flex-col-reverse gap-5'>{children}</div>;
};

export default FormButtonLayout;
