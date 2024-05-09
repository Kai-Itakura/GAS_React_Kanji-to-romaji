import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';

type DialogProps = {
  title: string;
  body: string;
};

const Dialog = ({ title, body }: DialogProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const closeDialog = () => setIsOpen(false);
  const onActionClick = () => {
    setIsOpen(false);
  };

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <AlertDialogContent className='rounded-lg max-w-[80%] block'>
        <AlertDialogHeader className='mb-4'>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className='break-words'>{body}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeDialog}>いいえ</AlertDialogCancel>
          <AlertDialogAction
            onClick={onActionClick}
            className='p-0'
          >
            <a
              href={body}
              target='_blank'
              rel='noopener noreferrer'
              className='size-full flex justify-center items-center'
            >
              はい
            </a>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Dialog;
