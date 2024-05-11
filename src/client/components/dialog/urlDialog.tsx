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
import { useKanjiStore, useRomajiStore } from '../form/store/store';

type UrlDialogProps = {
  title: string;
  body: string;
  reset: () => void;
};

const UrlDialog = ({ title, body, reset }: UrlDialogProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const setKanjiData = useKanjiStore((state) => state.setKanjiData);
  const setRomajiData = useRomajiStore((state) => state.setRomajiData);

  const handleClick = () => {
    setKanjiData(undefined);
    setRomajiData(undefined);
    reset();
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
          <AlertDialogCancel onClick={handleClick}>いいえ</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleClick}
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

export default UrlDialog;
